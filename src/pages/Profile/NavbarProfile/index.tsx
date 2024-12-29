import { Link } from 'react-router-dom';

import theme from '@styles/theme';

import settingIcon from '@assets/default/setting.svg';

import { StyledText } from '@components/Text/StyledText';

import { Nav, IconContainer } from './styles';

const NavbarProfile: React.FC = () => {
	return (
		<Nav>
			<StyledText $textTheme={{ style: 'heading1-bold' }} color={theme.colors.primary}>
				내정보
			</StyledText>
			<IconContainer>
				<Link to="/account/setting">
					<img src={settingIcon} alt="설정아이콘" />
				</Link>
			</IconContainer>
		</Nav>
	);
};

export default NavbarProfile;
