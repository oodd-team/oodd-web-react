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
	MoreBtn,
	Reaction,
	ReactionWrapper,
} from './styles';
import more from '../../../../assets/default/more.svg';
import xBtn from '../../../../assets/default/reject.svg';
import heartBtn from '../../../../assets/default/heart.svg';
import commentBtn from '../../../../assets/default/message-white.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
	IsMatchingCommentBottomSheetOpenAtom,
	MatchingInfoAtom,
} from '../../../../recoil/Home/MatchingCommentBottomSheetAtom';
import { IsBlockConfirmationModalOpenAtom, PostBlockAtom } from '../../../../recoil/Home/BlockBottomSheetAtom';
import { PostCommentAtom } from '../../../../recoil/Home/PostCommentBottomSheetAtom';
import { IsMeatballBottomSheetOpenAtom } from '../../../../recoil/Home/MeatballBottomSheetAtom';
import { PostSummary } from '../../../../apis/post/dto';
import defaultProfile from '../../../../assets/default/defaultProfile.svg';

interface Props {
	feed: PostSummary;
}

const Feed: React.FC<Props> = ({ feed }) => {
	const nav = useNavigate();
	const [isHeartClicked, setIsHeartClicked] = useState(false);
	const [, setIsMeatballBottomSheetOpen] = useRecoilState(IsMeatballBottomSheetOpenAtom);
	const [, setMatchingInfo] = useRecoilState(MatchingInfoAtom);
	const [, setIsHeartBottomSheetOpen] = useRecoilState(IsMatchingCommentBottomSheetOpenAtom);
	const [, setBlockInfo] = useRecoilState(PostBlockAtom);
	const [, setIsBlockConfirmationModalOpen] = useRecoilState(IsBlockConfirmationModalOpenAtom);
	const [, setPostComment] = useRecoilState(PostCommentAtom);
	const storedValue = localStorage.getItem('id');
	const userId = Number(storedValue);

	const handleHeartClick = () => {
		if (isHeartClicked === true) {
			alert('요청을 취소할 수 없습니다.');
		} else {
			setMatchingInfo({
				requesterId: userId,
				targetId: feed.user.userId,
				targetName: feed.user.nickname,
			});
			setIsHeartBottomSheetOpen(true);
			setIsHeartClicked(true);
		}
	};

	const handleBlockClick = () => {
		setBlockInfo({
			userId: userId,
			friendId: feed.user.userId,
			friendName: feed.user.nickname,
			action: 'toggle',
		});
		setIsBlockConfirmationModalOpen(true);
	};

	const handleCommentClick = () => {
		setPostComment({
			userName: feed.user.nickname,
			postId: feed.postId,
		});
		nav(`/post/${feed.postId}`, { state: { isCommentModalOpen: true } });
	};

	return (
		<FeedWrapper>
			<FeedTop>
				<Info onClick={() => nav(`/users/${feed.user.userId}`)}>
					<FeedProfileImgWrapper src={feed.user.profilePictureUrl || defaultProfile} alt="profile" />
					<StyledText $textTheme={{ style: 'body2-medium', lineHeight: 1.2 }} color={theme.colors.black}>
						{feed.user.nickname}
					</StyledText>
				</Info>
				<FeedTimeAgo $textTheme={{ style: 'caption2-medium', lineHeight: 1.2 }} color={theme.colors.gray2}>
					1시간 전
				</FeedTimeAgo>
				<MoreBtn onClick={() => setIsMeatballBottomSheetOpen(true)}>
					<img src={more} />
				</MoreBtn>
			</FeedTop>
			<FeedText
				onClick={() => nav(`/post/${feed.postId}`)}
				$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
				color={theme.colors.black}
			>
				{feed.content}
			</FeedText>
			<FeedImgBox $src={feed.postImages[0].url}>
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
							<img src={postImage.url} alt={`feed ${index + 1}`} className="ootd-image-small" />
						</SwiperSlide>
					))}
				</Swiper>
				<ReactionWrapper>
					<Reaction>
						<img className="button" onClick={handleBlockClick} src={xBtn} />
						{isHeartClicked ? (
							<img className="button" src={heartBtn} onClick={handleHeartClick} />
						) : (
							<img className="button" onClick={handleHeartClick} src={heartBtn} />
						)}
					</Reaction>

					<CommentBtn onClick={handleCommentClick}>
						<img src={commentBtn} />
						<StyledText $textTheme={{ style: 'body1-regular', lineHeight: 1.5 }} color={theme.colors.white}>
							코멘트 남기기
						</StyledText>
					</CommentBtn>
				</ReactionWrapper>
				<div className="blur"></div>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
