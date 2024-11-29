import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { OOTDContainer, FeedContainer } from './styles';
import Feed from './Feed';
import { getPostListApi } from '../../../apis/post';
import { PostSummary } from '../../../apis/post/dto';
import { debounce } from 'lodash';
import { handleError } from '../../../apis/util/handleError';
import { ModalProps } from '../../../components/Modal/dto';
import Modal from '../../../components/Modal';

const OOTD: React.FC = () => {
	const [feeds, setFeeds] = useState<PostSummary[]>([]);
	const [reachedEnd, setReachedEnd] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const feedPageRef = useRef(1);
	const scrollPositionRef = useRef(0);

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
	const handleScroll = debounce(() => {
		if (reachedEnd) return;

		if (window.innerHeight + document.documentElement.scrollTop >= document.body.scrollHeight - window.innerHeight) {
			scrollPositionRef.current = window.scrollY;
			console.log(scrollPositionRef.current);
			getPostList();
		}
	}, 50);

	useEffect(() => {
		getPostList();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useLayoutEffect(() => {
		window.scrollTo(0, scrollPositionRef.current); // 데이터 로드 후 스크롤 위치 복원
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
				{feeds.map((feed, index) => (
					<div key={index}>
						<Feed key={feed.user.userId} feed={feed} />
					</div>
				))}
			</FeedContainer>
		</OOTDContainer>
	);
};

export default OOTD;
