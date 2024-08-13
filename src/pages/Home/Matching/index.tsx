import React from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import Cards from '../../../components/Cards';
import { MatchingContainer, Like } from './styles';

const Matching: React.FC = () => {
	return (
		<MatchingContainer>
			<Like>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Likes you 4
				</StyledText>
			</Like>
			<Cards />
		</MatchingContainer>
	);
};

export default Matching;
