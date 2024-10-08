import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import {
	CommentBtn,
	FeedImgBox,
	FeedProfileImgWrapper,
	FeedText,
	FeedTimeAgo,
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
import commentBtn from '../../../../assets/Home/comment.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IsOpenHeartBottomSheetAtom, PostRequestAtom } from '../../../../recoil/Home/HeartBottomSheetAtom';
import { IsOpenBlockConfirmationModalAtom, PostBlockAtom } from '../../../../recoil/Home/BlockBottomSheetAtom';
import { PostCommentAtom } from '../../../../recoil/Home/PostCommentBottomSheetAtom';
import { IsOpenMeatballBottomSheetAtom } from '../../../../recoil/Home/MeatballBottomSheetAtom';

interface Props {
	feed: FeedProps;
}

const Feed: React.FC<Props> = ({ feed }) => {
	const nav = useNavigate();
	const [isHeartClicked, setIsHeartClicked] = useState(false);
	const [, setIsOpenMeatballBottomSheet] = useRecoilState(IsOpenMeatballBottomSheetAtom);
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
					<FeedProfileImgWrapper src={feed.profileUrl} alt="profile" />
					<StyledText $textTheme={{ style: 'body2-medium', lineHeight: 1.2 }} color={theme.colors.black}>
						{feed.userName}
					</StyledText>
				</Info>
				<FeedTimeAgo $textTheme={{ style: 'caption2-medium', lineHeight: 1.2 }} color={theme.colors.gray2}>
					1시간 전
				</FeedTimeAgo>
				<img src={more} style={{ cursor: 'pointer' }} onClick={() => setIsOpenMeatballBottomSheet(true)} />
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
						<img onClick={handleBlockClick} src={xBtn} />
						{!isHeartClicked && <img onClick={handleHeartClick} src={heartBtn} />}
						{isHeartClicked && <img src={clickedHeart} onClick={handleHeartClick} />}
					</Reaction>

					<CommentBtn onClick={handleCommentClick}>
						<img src={commentBtn} />
						<StyledText $textTheme={{ style: 'body1-regular', lineHeight: 1.5 }} color={theme.colors.white}>
							코멘트 남기기
						</StyledText>
					</CommentBtn>
				</ReactionWrapper>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
