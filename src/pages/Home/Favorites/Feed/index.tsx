import React, { useState } from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { Btn, CheckedBtn, FeedImgBox, FeedProfileImgWrapper, FeedTop, FeedWrapper, Info, Reaction } from './styles';
import { FeedProps } from '../dto';
import starBtn from '../../../../assets/Home/button_star.svg';
import checkedStarBtn from '../../../../assets/Home/clicked_star.svg';
import heartBtn from '../../../../assets/Home/button_heart.svg';
import checkedHeartBtn from '../../../../assets/Home/clicked_heart.svg';
import { useNavigate } from 'react-router-dom';
import request, { BaseResponse } from '../../../../apis/core';

interface Props {
	feed: FeedProps;
}

const Feed: React.FC<Props> = ({ feed }) => {
	const [hasLiked, setHasLiked] = useState(feed.hasLiked);
	const [hasInterested, setHasInterested] = useState(feed.hasInterested);
	const nav = useNavigate();

	const currentUserId = 18;

	const handleFeedClick = () => {
		nav(`/post/${feed.postId}`); // 게시물 ID를 포함한 경로로 이동
	};

	const handleLikeClick = async () => {
		try {
			const response = await request.post<BaseResponse>(`/user-relationships`, {
				requesterId: currentUserId,
				targetId: feed.userId,
				message: '하이',
			});
			if (response.isSuccess) {
				setHasLiked((prev) => !prev);
			} else {
				console.error('Failed to like the post');
			}
		} catch (error) {
			console.error('Error liking the post:', error);
		}
	};

	const handleInterestedClick = async () => {
		try {
			const response = await request.patch<BaseResponse>(`/user-interests`, {
				friendId: feed.userId, // feed.userId를 friendId로 보냄
			});
			if (response.isSuccess) {
				setHasInterested((prev) => !prev);
			} else {
				console.error('Failed to update interest status');
			}
		} catch (error) {
			console.error('Error updating interested status:', error);
		}
	};

	return (
		<FeedWrapper onClick={handleFeedClick}>
			<FeedImgBox>
				<img src={feed.feedImgUrl} />
				<FeedTop>
					<Info>
						<FeedProfileImgWrapper>
							<img src={feed.profileUrl} alt="profile" />
						</FeedProfileImgWrapper>
						<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1.2 }} color={theme.colors.white}>
							{feed.userName}
						</StyledText>
					</Info>
				</FeedTop>
				<Reaction>
					{hasLiked ? (
						<CheckedBtn
							onClick={(e) => {
								e.stopPropagation();
								handleLikeClick();
							}}
						>
							<img src={checkedHeartBtn} />
						</CheckedBtn>
					) : (
						<Btn
							onClick={(e) => {
								e.stopPropagation();
								handleLikeClick();
							}}
						>
							<img src={heartBtn} />
						</Btn>
					)}
					{hasInterested ? (
						<CheckedBtn
							onClick={(e) => {
								e.stopPropagation();
								handleInterestedClick();
							}}
						>
							<img src={checkedStarBtn} />
						</CheckedBtn>
					) : (
						<Btn
							onClick={(e) => {
								e.stopPropagation();
								handleInterestedClick();
							}}
						>
							<img src={starBtn} />
						</Btn>
					)}
				</Reaction>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
