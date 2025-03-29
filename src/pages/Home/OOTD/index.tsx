import { useRef, useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import debounce from 'lodash/debounce';

import { getPostListApi } from '@apis/post';

import Loading from '@components/Loading';

import Feed from './Feed/index';

import { OOTDContainer, FeedContainer } from './styles';

const OOTD: React.FC = () => {
	// 무한 스크롤을 감지할 요소
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	// Intersection Observer 인스턴스 저장 (컴포넌트 언마운트 시 해제 위함)
	const observerRef = useRef<IntersectionObserver | null>(null);

	// React Query를 사용한 무한 스크롤 데이터 로드
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
		queryKey: ['posts'], // 같은 key를 가진 쿼리는 캐시됨
		queryFn: ({ pageParam }) => getPostListApi({ pageParam }), // 페이지별 데이터 가져오는 함수
		initialPageParam: 1, // 첫 번째 페이지는 1부터 시작
		getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined, // 다음 페이지가 존재하면 page + 1, 없으면 undefined
	});

	// 디버깅
	useEffect(() => {
		console.log('Query Status:', status);
		console.log('Fetched Data:', data);
		console.log('Fetching Next Page:', isFetchingNextPage);
		console.log('Has Next Page:', hasNextPage);
	}, [status, data, isFetchingNextPage, hasNextPage]);

	// Intersection Observer를 설정하여 스크롤이 마지막 요소에 닿았을 때 fetchNextPage 호출
	useEffect(() => {
		if (!loadMoreRef.current || !hasNextPage) return; // 다음 페이지가 없으면 실행 X

		// Intersection Observer 생성
		observerRef.current = new IntersectionObserver(
			debounce((entries) => {
				// 요소가 화면에 보이면 fetchNextPage 호출 (스크롤 트리거)
				if (entries[0].isIntersecting) {
					fetchNextPage();
				}
			}, 300), // 디바운싱 적용 (300ms 내 반복 호출 방지)
			{
				root: null,
				rootMargin: '100px',
				threshold: 0,
			},
		);

		// 옵저버를 마지막 요소(loadMoreRef)에 연결
		observerRef.current.observe(loadMoreRef.current);

		return () => {
			// 컴포넌트 언마운트 시 옵저버 해제
			observerRef.current?.disconnect();
		};
	}, [hasNextPage, fetchNextPage]);

	return (
		<OOTDContainer>
			<FeedContainer>
				{data?.pages.flatMap((page) =>
					page.posts.map((feed) => (
						<div key={feed.id}>
							<Feed feed={feed} />
						</div>
					)),
				)}
				<div ref={loadMoreRef} />
				{isFetchingNextPage && <Loading />}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
