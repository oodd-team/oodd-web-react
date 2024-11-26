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
import ApiModal from '../../../../components/Modal/ApiModal';
import CommentBottomSheet from '../../../../components/CommentBottomSheet';
import Modal from '../../../../components/Modal';
import { CreateMatchingRequest } from '../../../../apis/matching/dto';
import { createMatchingApi } from '../../../../apis/matching';
import { handleError } from '../../../../apis/util/handleError';
import { ApiModalProps } from '../../../../components/Modal/ApiModal/dto';
import { CommentBottomSheetProps } from '../../../../components/CommentBottomSheet/dto';
import { ModalProps } from '../../../../components/Modal/dto';
import { postUserBlockApi } from '../../../../apis/user';
import { EmptySuccessResponse } from '../../../../apis/core/dto';
import { togglePostLikeStatusApi } from '../../../../apis/post-like';

interface FeedProps {
	feed: PostSummary;
}

const Feed: React.FC<FeedProps> = ({ feed }) => {
	const nav = useNavigate();
	const [isLikeClicked, setIsLikeClicked] = useState(feed.isPostLike);
	const timeAgo = dayjs(feed.createdAt).locale('ko').fromNow();
	const [isBlockApiModalOpen, setIsBlockApiModalOpen] = useState(false);
	const [isOptionsBottomSheetOpen, setIsOptionsBottomSheetOpen] = useState(false);
	const [isMatchingCommentBottomSheetOpen, setIsMatchingCommentBottomSheetOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const userId = localStorage.getItem('id');

	// 게시글 좋아요 & 좋아요 취소 api
	const togglePostLikeStatus = async () => {
		try {
			const response = await togglePostLikeStatusApi(feed.postId);

			if (response.isSuccess) {
				setIsLikeClicked((prev) => !prev);
			}
		} catch (error) {
			const errorMessage = handleError(error, 'post');
			setModalContent(errorMessage);
			setIsStatusModalOpen(true);
		}
	};

	// 매칭 생성 api
	const createMatching = async (comment: string) => {
		try {
			const matchingRequest: CreateMatchingRequest = {
				requesterId: Number(userId) || -1,
				targetId: feed.user.userId || -1,
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

	const handleMoreButtonClick = () => {
		setIsOptionsBottomSheetOpen(true);
	};

	const handleRejectButtonClick = () => {
		setIsBlockApiModalOpen(true);
	};

	const handleLikeButtonClick = () => {
		togglePostLikeStatus();
	};

	const handleMatchingButtonClick = () => {
		setIsMatchingCommentBottomSheetOpen(true);
	};

	// 게시글 옵션(더보기) 바텀시트
	const optionsBottomSheetProps: OptionsBottomSheetProps = {
		domain: 'post',
		targetId: feed.user.userId || -1,
		targetNickname: feed.user.nickname || '알수없음',
		isBottomSheetOpen: isOptionsBottomSheetOpen,
		onClose: () => {
			setIsOptionsBottomSheetOpen(false);
		},
	};

	// 차단하기 모달
	const blockApiModalProps: ApiModalProps<EmptySuccessResponse> = {
		response: postUserBlockApi({ fromUserId: Number(userId), toUserId: feed.user.userId, action: 'block' }),
		content: `${feed.user.nickname || '알수없음'} 님을\n정말로 차단하시겠어요?`,
		buttonContent: '차단하기',
		successContent: '정상적으로 처리되었습니다.',
		handleCloseModal: () => {
			setIsBlockApiModalOpen(false);
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
		<FeedWrapper>
			<OptionsBottomSheet {...optionsBottomSheetProps} />
			{isBlockApiModalOpen && <ApiModal {...blockApiModalProps} />}
			<CommentBottomSheet {...matchingCommentBottomSheetProps} />
			{isStatusModalOpen && <Modal {...statusModalProps} />}

			<FeedTop>
				<Info onClick={() => nav(`/users/${feed.user.userId}`)}>
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
			<FeedText
				onClick={() => nav(`/post/${feed.postId}`)}
				$textTheme={{ style: 'body2-regular' }}
				color={theme.colors.black}
			>
				{feed.content}
			</FeedText>
			<FeedImgBox $src={feed.postImages[0].imageUrl}>
				<Swiper
					slidesPerView={1}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="ootdSwiper"
				>
					{feed.postImages.map((postImage, index) => (
						<SwiperSlide key={index}>
							<img src={postImage.imageUrl} alt={`${feed.user.nickname}의 피드 이미지`} className="ootd-image-small" />
						</SwiperSlide>
					))}
				</Swiper>
				<ReactionWrapper>
					<Reaction>
						<img className="button" onClick={handleRejectButtonClick} src={xBtn} />
						{isLikeClicked ? (
							<img className="button" onClick={handleLikeButtonClick} src={likeBtn} />
						) : (
							<img className="button" onClick={handleLikeButtonClick} src={likeFillBtn} />
						)}
					</Reaction>
					<MatchingBtn onClick={handleMatchingButtonClick}>
						<img src={commentBtn} />
						<StyledText $textTheme={{ style: 'body1-regular' }} color={theme.colors.white}>
							매칭 요청
						</StyledText>
					</MatchingBtn>
				</ReactionWrapper>
				<div className="blur"></div>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
