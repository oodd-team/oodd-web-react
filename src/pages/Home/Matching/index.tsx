import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import Card from '../Card';
import { Like } from './styles';

const Matching: React.FC = () => {
	return (
		<>
			<Like>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.gray4}>
					Likes you 3
				</StyledText>
			</Like>
			<Card />
		</>
	);
};

export default Matching;
