import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { TopbarLayout, BackButton, KebabMenuButton } from './styles';
import { useNavigate } from 'react-router-dom';
import Back from '../../../../assets/Chats/Back.svg';
import KebabMenu from '../../../../assets/Chats/KebabMenu.svg';

const TopBar: React.FC<{ handleMenu: () => void }> = ({ handleMenu }) => {
	const nav = useNavigate();

	return (
		<TopbarLayout>
			<BackButton
				src={Back}
				alt="back"
				onClick={() => {
					nav(-1);
				}}
			/>
			<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.black}>
				IDID
			</StyledText>
			<KebabMenuButton src={KebabMenu} alt="menu" onClick={handleMenu} />
		</TopbarLayout>
	);
};

export default TopBar;
