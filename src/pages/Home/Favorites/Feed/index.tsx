import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { Btn, CheckedBtn, FeedImgBox, FeedProfileImgWrapper, FeedTop, FeedWrapper, Info, Reaction } from './styles';
import { FeedProps } from '../dto';
import starBtn from '../../../../assets/Home/button_star.svg'
import checkedHeart from '../../../../assets/Home/clicked_heart.svg'


interface Props {
	feed: FeedProps;
}

const Feed: React.FC<Props> = ({ feed }) => {
	return (
		<FeedWrapper>
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
					<CheckedBtn>
						<img src={checkedHeart} />
					</CheckedBtn>
					<Btn>
						<img src={starBtn} />
					</Btn>
				</Reaction>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
