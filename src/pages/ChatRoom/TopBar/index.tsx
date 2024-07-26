import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TopbarLayout, BackButton, KebabMenu, Username } from './styles';

const TopBar: React.FC = () => {

	return (
		<TopbarLayout>
			<BackButton
				src="../../../../back.png"
				alt="back"
			/>
			<Username>
				<StyledText textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.black}>
					IDID
				</StyledText>
			</Username>
			<KebabMenu
				src="../../../../kebab-menu.png"
				alt="menu"
			/>
		</TopbarLayout>
	);
};

export default TopBar;
