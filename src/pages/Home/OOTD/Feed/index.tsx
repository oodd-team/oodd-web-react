import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import {
	MatchingBtn,
	FeedImgBox,
	FeedProfileImgWrapper,
	FeedText,
	FeedTimeAgo,
	FeedTop,
	FeedWrapper,
	Info,
	MoreBtn,
	Reaction,
	ReactionWrapper,
	FeedImgBackground,
} from './styles';
import more from '../../../../assets/default/more.svg';
import xBtn from '../../../../assets/default/reject.svg';
import likeBtn from '../../../../assets/default/heart.svg';
import likeFillBtn from '../../../../assets/default/heart-fill.svg';
import commentBtn from '../../../../assets/default/message-white.svg';
import { useNavigate } from 'react-router-dom';
import { PostSummary } from '../../../../apis/post/dto';
import defaultProfile from '../../../../assets/default/defaultProfile.svg';
import dayjs from 'dayjs';
import { OptionsBottomSheetProps } from '../../../../components/BottomSheet/OptionsBottomSheet/dto';
import OptionsBottomSheet from '../../../../components/BottomSheet/OptionsBottomSheet';
import CommentBottomSheet from '../../../../components/CommentBottomSheet';
import Modal from '../../../../components/Modal';
import { CreateMatchingRequest } from '../../../../apis/matching/dto';
import { createMatchingApi } from '../../../../apis/matching';
import { handleError } from '../../../../apis/util/handleError';
import { CommentBottomSheetProps } from '../../../../components/CommentBottomSheet/dto';
import { ModalProps } from '../../../../components/Modal/dto';

import { togglePostLikeStatusApi } from '../../../../apis/post-like';
import { postUserBlockApi } from '../../../../apis/user-block';
import { PostUserBlockRequest } from '../../../../apis/user-block/dto';

interface FeedProps {
	feed: PostSummary;
}

const Feed: React.FC<FeedProps> = ({ feed }) => {
	const nav = useNavigate();
	const [isLikeClicked, setIsLikeClicked] = useState(feed.isPostLike);
	const timeAgo = dayjs(feed.createdAt).locale('ko').fromNow();
	const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
	const [isOptionsBottomSheetOpen, setIsOptionsBottomSheetOpen] = useState(false);
	const [isMatchingCommentBottomSheetOpen, setIsMatchingCommentBottomSheetOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const userId = localStorage.getItem('my_id');

	// 게시글 좋아요 & 좋아요 취소 api
	const togglePostLikeStatus = async () => {
		try {
			const response = await togglePostLikeStatusApi(feed.id);

			if (response.isSuccess) {
				setIsLikeClicked((prev) => !prev);
			}
		} catch (error) {
			const errorMessage = handleError(error, 'post');
			setModalContent(errorMessage);
			setIsStatusModalOpen(true);
		}
	};

	// 유저 차단 api
	const postUserBlock = async () => {
		try {
			const data: PostUserBlockRequest = {
				fromUserId: Number(userId) || -1,
				toUserId: feed.user.id,
				action: 'block',
			};
			const response = await postUserBlockApi(data);

			if (response.isSuccess) {
				setModalContent('정상적으로 처리되었습니다.');
			}
		} catch (error) {
			const errorMessage = handleError(error);
			setModalContent(errorMessage);
		} finally {
			setIsBlockModalOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	// 매칭 생성 api
	const createMatching = async (comment: string) => {
		try {
			const matchingRequest: CreateMatchingRequest = {
				requesterId: Number(userId) || -1,
				targetId: feed.user.id || -1,
				message: comment,
			};
			const response = await createMatchingApi(matchingRequest);

			if (response.isSuccess) {
				setModalContent(`${feed.user.nickname} 님에게 대표 OOTD와\n한 줄 메세지를 보냈어요!`);
			}
		} catch (error) {
			const errorMessage = handleError(error, 'user');
			setModalContent(errorMessage);
		} finally {
			setIsMatchingCommentBottomSheetOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	const handleUserClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		sessionStorage.setItem('scrollPosition', String(window.scrollY));
		nav(`/users/${feed.user.id}`);
	};

	const handleMoreButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsOptionsBottomSheetOpen(true);
	};

	const handleRejectButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsBlockModalOpen(true);
	};

	const handleLikeButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		togglePostLikeStatus();
	};

	const handleMatchingButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMatchingCommentBottomSheetOpen(true);
	};

	const handleClickFeed = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;

		// 페이지네이션 bullet 클릭 시 이벤트 차단
		if (target.classList.contains('swiper-pagination-bullet')) {
			e.stopPropagation();
		} else {
			// 그 외에 게시글 상세 조회 페이지로 이동
			sessionStorage.setItem('scrollPosition', String(window.scrollY));
			nav(`/post/${feed.id}`);
		}
	};

	// 게시글 옵션(더보기) 바텀시트
	const optionsBottomSheetProps: OptionsBottomSheetProps = {
		domain: 'post',
		targetId: {
			userId: feed.user.id || -1,
			postId: feed.id || -1,
		},
		targetNickname: feed.user.nickname || '알수없음',
		isBottomSheetOpen: isOptionsBottomSheetOpen,
		onClose: () => {
			setIsOptionsBottomSheetOpen(false);
		},
	};

	// 차단하기 모달
	const blockModalProps: ModalProps = {
		isCloseButtonVisible: true,
		content: `${feed.user.nickname || '알수없음'} 님을\n정말로 차단하시겠어요?`,
		button: {
			content: '차단하기',
			onClick: postUserBlock,
		},
		onClose: () => {
			setIsBlockModalOpen(false);
		},
	};

	// 매칭 요청 코멘트 바텀시트
	const matchingCommentBottomSheetProps: CommentBottomSheetProps = {
		isBottomSheetOpen: isMatchingCommentBottomSheetOpen,
		commentProps: {
			content: `${feed.user.nickname || '알수없음'} 님에게 대표 OOTD와 함께 전달될\n한줄 메시지를 보내보세요!`,
			sendComment: createMatching,
		},
		handleCloseBottomSheet: () => {
			setIsMatchingCommentBottomSheetOpen(false);
		},
	};

	// api 응답 상태에 따른 메시지를 출력하는 모달
	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	return (
		<FeedWrapper onClick={handleClickFeed}>
			<OptionsBottomSheet {...optionsBottomSheetProps} />
			{isBlockModalOpen && <Modal {...blockModalProps} />}
			<CommentBottomSheet {...matchingCommentBottomSheetProps} />
			{isStatusModalOpen && <Modal {...statusModalProps} />}

			<FeedTop>
				<Info onClick={handleUserClick}>
					<FeedProfileImgWrapper src={feed.user.profilePictureUrl || defaultProfile} alt="profile" />
					<StyledText $textTheme={{ style: 'body2-medium' }} color={theme.colors.black}>
						{feed.user.nickname}
					</StyledText>
				</Info>
				<FeedTimeAgo $textTheme={{ style: 'caption2-medium' }} color={theme.colors.gray2}>
					{timeAgo}
				</FeedTimeAgo>
				<MoreBtn onClick={handleMoreButtonClick}>
					<img src={more} />
				</MoreBtn>
			</FeedTop>
			<FeedText $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
				{feed.content}
			</FeedText>
			<FeedImgBox>
				<Swiper
					slidesPerView={1}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="ootdSwiper"
				>
					{feed.postImages.map((postImage) => (
						<div key={postImage.url}>
							<SwiperSlide>
								<img src={postImage.url} alt={`${feed.user.nickname}의 피드 이미지`} className="ootd-image-small" />
								<div className="blur"></div>
								<FeedImgBackground $src={postImage.url} />
							</SwiperSlide>
						</div>
					))}
				</Swiper>
				<ReactionWrapper>
					<Reaction>
						<img className="button" onClick={handleRejectButtonClick} src={xBtn} />
						{isLikeClicked ? (
							<img className="button" onClick={handleLikeButtonClick} src={likeFillBtn} />
						) : (
							<img className="button" onClick={handleLikeButtonClick} src={likeBtn} />
						)}
					</Reaction>
					<MatchingBtn onClick={handleMatchingButtonClick}>
						<img src={commentBtn} />
						<StyledText $textTheme={{ style: 'body1-regular' }} color={theme.colors.white}>
							매칭 요청
						</StyledText>
					</MatchingBtn>
				</ReactionWrapper>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
