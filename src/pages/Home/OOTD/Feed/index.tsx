import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { FeedImgBox, FeedProfileImgWrapper, FeedText, FeedTop, FeedWrapper, Info } from './styles';
import { FeedProps } from '../dto';
import more from '../../../../assets/Home/grommet-icons_more.svg';

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
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
