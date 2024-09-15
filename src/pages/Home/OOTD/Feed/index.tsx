import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import {
	Btn,
	CommentBtn,
	FeedImgBox,
	FeedProfileImgWrapper,
	FeedText,
	FeedTop,
	FeedWrapper,
	Info,
	Reaction,
	ReactionWrapper,
} from './styles';
import { FeedProps } from '../dto';
import more from '../../../../assets/Home/grommet-icons_more.svg';
import xBtn from '../../../../assets/Home/button_reject.svg';
import heartBtn from '../../../../assets/Home/button_heart.svg';
import clickedHeart from '../../../../assets/Home/clicked_bigheart.svg';
import starBtn from '../../../../assets/Home/button_star.svg';
import clickedStar from '../../../../assets/Home/clicked_bigstar.svg';
import commentBtn from '../../../../assets/Home/comment.svg';
import { useNavigate } from 'react-router-dom';
import request from '../../../../apis/core'; // request 인스턴스 임포트
import { useRecoilState } from 'recoil';
import { IsOpenHeartBottomSheetAtom, PostRequestAtom } from '../../../../recoil/Home/HeartBottomSheetAtom';
import { IsOpenBlockConfirmationModalAtom, PostBlockAtom } from '../../../../recoil/Home/BlockBottomSheetAtom';
import { PostCommentAtom } from '../../../../recoil/Home/PostCommentBottomSheetAtom';

interface Props {
	feed: FeedProps;
	onMoreClick: () => void;
}

const Feed: React.FC<Props> = ({ feed, onMoreClick }) => {
	const nav = useNavigate();
	const [isHeartClicked, setIsHeartClicked] = useState(false);
	const [isStarClicked, setIsStarClicked] = useState(false);
	const [, setPostRequest] = useRecoilState(PostRequestAtom);
	const [, setIsOpenHeartBottomSheet] = useRecoilState(IsOpenHeartBottomSheetAtom);
	const [, setPostBlock] = useRecoilState(PostBlockAtom);
	const [, setIsOpenBlockConfirmationModal] = useRecoilState(IsOpenBlockConfirmationModalAtom);
	const [, setPostComment] = useRecoilState(PostCommentAtom);
	const storedValue = localStorage.getItem('id');
	const userId = Number(storedValue);

	const handleHeartClick = () => {
		if (isHeartClicked === true) {
			alert('요청을 취소할 수 없습니다.');
		} else {
			setPostRequest({
				requesterId: userId,
				targetId: feed.userId,
				targetName: feed.userName,
			});
			setIsOpenHeartBottomSheet(true);
			setIsHeartClicked(true);
		}
	};

	const handleBlockClick = () => {
		setPostBlock({
			userId: userId,
			friendId: feed.userId,
			friendName: feed.userName,
			action: 'toggle',
		});
		setIsOpenBlockConfirmationModal(true);
	};

	const handleStarClick = async () => {
		// 별을 즉시 토글하여 UI를 업데이트합니다.
		setIsStarClicked((prev) => !prev);

		try {
			const response = await request.patch<{ isSuccess: boolean; message: string; result: any }>('/user-interests', {
				friendId: feed.userId,
			});

			if (!response.isSuccess) {
				// 요청이 실패하면 원래 상태로 복구합니다.
				setIsStarClicked((prev) => !prev);
				console.error('Failed to toggle interest:', response.message);
			}
		} catch (error) {
			// 요청이 실패하면 원래 상태로 복구합니다.
			setIsStarClicked((prev) => !prev);
			console.error('Error toggling interest:', error);
		}
	};

	const handleCommentClick = () => {
		setPostComment({
			userName: feed.userName,
			postId: feed.postId,
		});
		nav(`/post/${feed.postId}`, { state: { isCommentModalOpen: true } });
	};

	return (
		<FeedWrapper>
			<FeedTop>
				<Info onClick={() => nav(`/users/${feed.userId}`)}>
					<FeedProfileImgWrapper>
						<img src={feed.profileUrl} alt="profile" />
					</FeedProfileImgWrapper>
					<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1.2 }} color={theme.colors.black}>
						{feed.userName}
					</StyledText>
				</Info>
				<img src={more} style={{ cursor: 'pointer' }} onClick={onMoreClick} />
			</FeedTop>
			<FeedText onClick={() => nav(`/post/${feed.postId}`)}>
				<StyledText
					$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
					color={theme.colors.black}
					style={{ opacity: '50%' }}
				>
					{feed.text}
				</StyledText>
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
					{feed.feedImgUrls.map((url, index) => (
						<SwiperSlide key={index}>
							<img src={url} alt={`feed ${index + 1}`} className="ootd-image-small" />
						</SwiperSlide>
					))}
				</Swiper>
				<ReactionWrapper>
					<Reaction>
						<Btn onClick={handleBlockClick}>
							<img src={xBtn} style={{ width: '1.5rem', height: '1.5rem' }} />
						</Btn>
						{!isHeartClicked && (
							<Btn onClick={handleHeartClick}>
								<img src={heartBtn} />
							</Btn>
						)}
						{isHeartClicked && (
							<img src={clickedHeart} onClick={handleHeartClick} style={{ width: '3.75rem', height: '3.75rem' }} />
						)}
						{!isStarClicked && (
							<Btn onClick={handleStarClick}>
								<img src={starBtn} />
							</Btn>
						)}
						{isStarClicked && (
							<img
								src={clickedStar}
								onClick={handleStarClick}
								style={{ width: '3.75rem', height: '3.75rem', cursor: 'pointer' }}
							/>
						)}
					</Reaction>

					<CommentBtn onClick={handleCommentClick}>
						<img src={commentBtn} />
						<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
							코멘트 남기기
						</StyledText>
					</CommentBtn>
				</ReactionWrapper>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
