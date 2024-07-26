import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TopbarLayout, BackButton, KebabMenu, Username } from './styles';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isClickedMenuAtom } from '../../../recoil/isClickedMenu';

const TopBar: React.FC = () => {
	const setIsClickedMenu = useSetRecoilState(isClickedMenuAtom);
	const nav = useNavigate();

	return (
		<TopbarLayout>
			<BackButton
				src="../../../../back.png"
				alt="back"
				onClick={()=>{nav(-1);}}
			/>
			<Username>
				<StyledText textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.black}>
					IDID
				</StyledText>
			</Username>
			<KebabMenu
				src="../../../../kebab-menu.png"
				alt="menu"
				onClick={() => {
					setIsClickedMenu(true);
				}}
			/>
		</TopbarLayout>
	);
};

export default TopBar;
