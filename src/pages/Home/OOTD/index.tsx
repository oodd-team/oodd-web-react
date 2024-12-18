import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { OOTDContainer, FeedContainer } from './styles';
import Feed from './Feed/index';
import { getPostListApi } from '@apis/post';
import type { PostSummary } from '@apis/post/dto';
import { handleError } from '@apis/util/handleError';
import type { ModalProps } from '@components/Modal/dto';
import Modal from '@components/Modal';

const OOTD: React.FC = () => {
	const [feeds, setFeeds] = useState<PostSummary[]>([]);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const savedScrollPosition = sessionStorage.getItem('scrollPosition');
	const feedPageRef = useRef(1);
	const scrollPositionRef = useRef(Number(savedScrollPosition) || 0);
	const isFetchingRef = useRef(false);

	const getPostList = async () => {
		if (reachedEnd) return;

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
		}
	};

	// 스크롤 이벤트 핸들러 추가
	const handleScroll = () => {
		// 모든 데이터를 불러왔거나 아직 렌더링이 다 안 된 경우 반환
		if (reachedEnd || isFetchingRef.current) return;

		if (window.innerHeight + document.documentElement.scrollTop >= document.body.scrollHeight - window.innerHeight) {
			isFetchingRef.current = true;
			scrollPositionRef.current = window.scrollY;
			getPostList();
		}
	};

	useEffect(() => {
		getPostList();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useLayoutEffect(() => {
		window.scrollTo(0, scrollPositionRef.current);
		isFetchingRef.current = false;
	}, [feeds]); // feeds가 변경될 때 실행

	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	return (
		<OOTDContainer>
			{isStatusModalOpen && <Modal {...statusModalProps} />}
			<FeedContainer>
				{feeds.map((feed) => (
					<div key={feed.id}>
						<Feed feed={feed} />
					</div>
				))}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
