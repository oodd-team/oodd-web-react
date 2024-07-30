import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import {
	Btn,
	Comment,
	CommentBtn,
	FeedBottom,
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
import starBtn from '../../../../assets/Home/button_star.svg';
import commentBtn from '../../../../assets/Home/comment.svg';

interface Props {
	feed: FeedProps;
}

const Feed: React.FC<Props> = ({ feed }) => {
	return (
		<FeedWrapper>
			<FeedTop>
				<Info>
					<FeedProfileImgWrapper>
						<img src={feed.profileUrl} alt="tag" />
					</FeedProfileImgWrapper>
					<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1.2 }} color={theme.colors.black}>
						{feed.userName}
					</StyledText>
				</Info>
				<img src={more} style={{ cursor: 'pointer' }} />
			</FeedTop>
			<FeedBottom>
				<FeedText>
					<StyledText
						$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
						color={theme.colors.black}
						style={{ opacity: '50%' }}
					>
						{feed.text}
					</StyledText>
				</FeedText>
				<FeedImgBox>
					<img src={feed.feedImgUrl} />
					<ReactionWrapper>
						<Reaction>
							<Btn>
								<img src={xBtn} style={{ width: '1.5rem', height: '1.5rem' }} />
							</Btn>
							<Btn>
								<img src={heartBtn} />
							</Btn>
							<Btn>
								<img src={starBtn} />
							</Btn>
						</Reaction>
						<Comment>
							<CommentBtn>
								<img src={commentBtn} />
								<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
									코멘트 남기기
								</StyledText>
							</CommentBtn>
						</Comment>
					</ReactionWrapper>
				</FeedImgBox>
			</FeedBottom>
		</FeedWrapper>
	);
};

export default Feed;
