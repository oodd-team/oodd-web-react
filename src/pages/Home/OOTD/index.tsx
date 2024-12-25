import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import { OOTDContainer, FeedContainer } from './styles';
import Feed from './Feed/index';
import { getPostListApi } from '@apis/post';
import type { PostSummary } from '@apis/post/dto';
import { handleError } from '@apis/util/handleError';
import type { ModalProps } from '@components/Modal/dto';
import Modal from '@components/Modal';

const OOTD: React.FC = () => {
	const [feeds, setFeeds] = useState<PostSummary[]>([]);

	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

	const [reachedEnd, setReachedEnd] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const feedPageRef = useRef(1); // 현재 페이지 번호를 참조하는 변수, 리렌더링 없이 값만 업데이트 하기 위해 상태가 아닌 useRef 사용

	// 세션 스토리지에서 이전 스크롤 위치를 가져와 초기화
	const savedScrollPosition = sessionStorage.getItem('scrollPosition');
	const scrollPositionRef = useRef(Number(savedScrollPosition) || 0);

	const observerRef = useRef<IntersectionObserver | null>(null); // IntersectionObserver 인스턴스를 참조하는 변수
	const loadMoreRef = useRef<HTMLDivElement | null>(null); // 더 많은 데이터를 로드할 때 관찰할 마지막 요소의 DOM을 참조

	// 전체 게시글(피드) 조회 API
	const getPostList = async () => {
		if (reachedEnd || isFetching) return;
		// 사용자가 스크롤을 빠르게 내리거나 ntersection Observer가 여러 번 트리거될 경우, 중복된 API 요청 발생 가능.
		// 이를 막기 위해 isFetching 상태를 확인하고, 현재 요청 중인 상태라면 추가 요청을 막음

		setIsFetching(true);
		try {
			const response = await getPostListApi(feedPageRef.current, 20);

			if (response.isSuccess) {
				if (response.data.post.length === 0) {
					setReachedEnd(true);
				} else {
					setFeeds((prevFeeds) => [...prevFeeds, ...response.data.post]);
					feedPageRef.current += 1;
				}
			}
		} catch (error) {
			const errorMessage = handleError(error);
			setModalContent(errorMessage);
			setIsStatusModalOpen(true);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		if (reachedEnd && observerRef.current && loadMoreRef.current) {
			observerRef.current.unobserve(loadMoreRef.current);
			return; // 데이터의 끝에 다다르면 옵저버 해제. (더이상 피드가 없으면)
		}

		observerRef.current = new IntersectionObserver( // Intersection Observer 생성
			debounce((entries) => {
				const target = entries[0];
				console.log('Intersection Observer:', target.isIntersecting);
				if (target.isIntersecting && !isFetching && !reachedEnd) {
					// 요소가 화면에 보이고 있고, 요청 중이 아니며며 끝에 도달하지 않았다면 api 호출
					getPostList();
				}
			}, 300), // 디바운스 적용해 스크롤 이벤트 제어. 스크롤마다 이벤트 호출하는 것이 아닌 마지막 스크롤 이후 300ms동안 동작이 없으면 이벤트 호출
			{
				root: null,
				rootMargin: '100px', // // 요소가 보이기 100px 전에 미리 데이터 로드
				threshold: 0, // 요소가 아주 조금이라도 보이면 트리거
			},
		);

		// 옵저버를 마지막 요소에 연결
		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}
		return () => {
			// 컴포넌트가 언마운트되거나 의존성이 변경될 때 옵저버 해제
			if (observerRef.current && loadMoreRef.current) {
				observerRef.current.unobserve(loadMoreRef.current);
			}
		};
	}, [isFetching, reachedEnd]);

	useEffect(() => {
		// 첫 로드 시 API 호출
		getPostList();

		// 세션 저장된 이전 스크롤 위치 복원
		window.scrollTo(0, scrollPositionRef.current);

		return () => {
			// 컴포넌트 언마운트 시 현재 스크롤 위치를 세션 스토리지에 저장
			sessionStorage.setItem('scrollPosition', String(window.scrollY));
		};
	}, []);

	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	return (
		<OOTDContainer>
			<FeedContainer>
				{feeds.map((feed) => (
					<div key={feed.id}>
						<Feed feed={feed} />
					</div>
				))}
				{/* Intersection Observer가 감지할 마지막 요소 */}
				<div ref={loadMoreRef} style={{ height: '1px', backgroundColor: 'transparent' }} />
			</FeedContainer>
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</OOTDContainer>
	);
};

export default OOTD;
