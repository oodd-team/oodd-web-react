import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { FeedImgBox, FeedProfileImgWrapper, FeedTop, FeedWrapper, Info } from './styles';

import { FeedProps } from '../dto';

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
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
