import React, { useState, useEffect, useRef } from 'react';
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
		// Intersection Observer 설정
		observerRef.current = new IntersectionObserver(
			(entries) => {
				const target = entries[0];
				if (target.isIntersecting && !isFetching) {
					getPostList();
				}
			},
			{
				root: null, // viewport
				rootMargin: '0px',
				threshold: 1.0, // 요소가 100% 보여질 때 트리거
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
