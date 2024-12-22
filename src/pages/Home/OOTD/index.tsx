import React, { useState, useEffect, useRef } from 'react';
import { OOTDContainer, FeedContainer } from './styles';
import Feed from './Feed/index';
import { getPostListApi } from '@apis/post';
import type { PostSummary } from '@apis/post/dto';
import { handleError } from '@apis/util/handleError';
import type { ModalProps } from '@components/Modal/dto';
import Modal from '@components/Modal';
import debounce from 'lodash/debounce';

const OOTD: React.FC = () => {
	const [feeds, setFeeds] = useState<PostSummary[]>([]);

	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

	const [reachedEnd, setReachedEnd] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const feedPageRef = useRef(1);
	const savedScrollPosition = sessionStorage.getItem('scrollPosition');
	const scrollPositionRef = useRef(Number(savedScrollPosition) || 0);

	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	// 전체 게시글(피드) 조회 API
	const getPostList = async () => {
		if (reachedEnd || isFetching) return;

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
			return; // 더 이상 옵저버 실행 안 함
		}

		observerRef.current = new IntersectionObserver(
			debounce((entries) => {
				const target = entries[0];
				console.log('Intersection Observer:', target.isIntersecting);
				if (target.isIntersecting && !isFetching && !reachedEnd) {
					getPostList();
				}
			}, 300), // 디바운스 적용
			{
				root: null,
				rootMargin: '100px', // 미리 데이터 로드
				threshold: 0, // 요소가 조금이라도 보이면 트리거
			},
		);

		if (loadMoreRef.current) {
			observerRef.current.observe(loadMoreRef.current);
		}
		return () => {
			if (observerRef.current && loadMoreRef.current) {
				observerRef.current.unobserve(loadMoreRef.current);
			}
		};
	}, [isFetching, reachedEnd]);

	useEffect(() => {
		// 초기 데이터 로드
		getPostList();

		// 세션 저장된 스크롤 위치 복원
		window.scrollTo(0, scrollPositionRef.current);

		return () => {
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
				<div ref={loadMoreRef} style={{ height: '1px', backgroundColor: 'transparent' }} />
			</FeedContainer>
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</OOTDContainer>
	);
};

export default OOTD;
