import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { Btn, CheckedBtn, FeedImgBox, FeedProfileImgWrapper, FeedTop, FeedWrapper, Info, Reaction } from './styles';
import { FeedProps } from '../dto';
import starBtn from '../../../../assets/Home/button_star.svg';
import checkedStarBtn from '../../../../assets/Home/clicked_star.svg';
import heartBtn from '../../../../assets/Home/button_heart.svg';
import checkedHeartBtn from '../../../../assets/Home/clicked_heart.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
	feed: FeedProps;
}

const Feed: React.FC<Props> = ({ feed }) => {
	const nav = useNavigate();
	const handleFeedClick = () => {
		nav(`/post/${feed.postId}`); // 게시물 ID를 포함한 경로로 이동
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
					{feed.hasLiked ? (
						<CheckedBtn>
							<img src={checkedHeartBtn} />
						</CheckedBtn>
					) : (
						<Btn>
							<img src={heartBtn} />
						</Btn>
					)}
					{feed.hasInterested ? (
						<CheckedBtn>
							<img src={checkedStarBtn} />
						</CheckedBtn>
					) : (
						<Btn>
							<img src={starBtn} />
						</Btn>
					)}
				</Reaction>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
