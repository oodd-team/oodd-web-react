import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import Card from './Card';
import { Like, MatchingContainer } from './styles';

// 매칭 탭입니다.
const Matching: React.FC = () => {
	return (
		<MatchingContainer>
			<Like>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.gray4}>
					Likes you 3
				</StyledText>
			</Like>
			<Card />
		</MatchingContainer>
	);
};

export default Matching;
