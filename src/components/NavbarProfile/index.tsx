import React from 'react';
import { Nav, IconContainer } from './styles';
import { Link } from 'react-router-dom';
import settingIcon from './assets/settingIcon.svg';

import { Heading1B} from '../../components/Text/StyledText'


const NavbarProfile: React.FC = () => {
	return (
		<Nav>
			<Heading1B>
				내정보
			</Heading1B>
			<IconContainer>
				<Link to="/account-setting">
					<img src={settingIcon} alt="설정아이콘" />
				</Link>
			</IconContainer>
		</Nav>
	);
};

export default NavbarProfile;
