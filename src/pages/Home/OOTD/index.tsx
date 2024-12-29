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

	const isFetchingRef = useRef(false);
	const isReachedEndRef = useRef(false);
	const feedPageRef = useRef(1);

	// IntersectionObserver 인스턴스를 참조하는 변수
	const observerRef = useRef<IntersectionObserver | null>(null);
	// observer 콜백 함수를 트리거하는 요소를 참조하는 변수
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	// 세션 스토리지에서 이전 스크롤 위치를 가져와 초기화
	const savedScrollPosition = sessionStorage.getItem('scrollPosition');
	const scrollPositionRef = useRef(Number(savedScrollPosition) || 0);

	// 전체 게시글(피드) 조회 API
	const getPostList = async () => {
		// 모든 데이터를 불러왔거나 요청 중이라면 함수 실행 중단
		if (isReachedEndRef.current || isFetchingRef.current) return;

		isFetchingRef.current = true;

		try {
			const response = await getPostListApi(feedPageRef.current, 20);

			if (response.isSuccess) {
				if (response.data.post.length === 0) {
					isReachedEndRef.current = true;
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
			isFetchingRef.current = false;
			console.log(feeds);
		}
	};

	useEffect(() => {
		// 데이터의 끝에 다다르면 옵저버 해제 (더이상 피드가 없으면)
		if (isReachedEndRef.current && observerRef.current && loadMoreRef.current) {
			observerRef.current.unobserve(loadMoreRef.current);

			return;
		}

		// Intersection Observer 생성
		observerRef.current = new IntersectionObserver(
			debounce((entries) => {
				const target = entries[0];
				console.log('Intersection Observer:', target.isIntersecting);
				if (target.isIntersecting && !isFetchingRef.current && !isReachedEndRef.current) {
					getPostList();
				}
			}, 300),
			{
				root: null,
				rootMargin: '100px',
				threshold: 0,
			},
		);

		// 옵저버를 마지막 요소에 연결
		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}
		return () => {
			// 컴포넌트 언마운트 시 옵저버 해제
			if (observerRef.current && loadMoreRef.current) {
				observerRef.current.unobserve(loadMoreRef.current);
			}
		};
	}, []);

	useEffect(() => {
		getPostList();

		// 세션에 저장된 이전 스크롤 위치 복원
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
				<div ref={loadMoreRef} />
			</FeedContainer>
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</OOTDContainer>
	);
};

export default OOTD;
