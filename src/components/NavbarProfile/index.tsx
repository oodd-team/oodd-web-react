import React from 'react';
import { Nav, IconContainer } from './styles';
import { Link } from 'react-router-dom';
import settingIcon from '../../assets/default/setting.svg';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';

const NavbarProfile: React.FC = () => {
	return (
		<Nav>
			<StyledText $textTheme={{ style: 'heading1-medium', lineHeight: 2 }} color={theme.colors.gray4}>
				Profile
			</StyledText>
			<IconContainer>
				<Link to="/account-setting">
					<img src={settingIcon} alt="설정아이콘" />
				</Link>
			</IconContainer>
		</Nav>
	);
};

export default NavbarProfile;
