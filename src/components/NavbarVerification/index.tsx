import React from 'react';
import { Nav, TextContainer, BackButton } from './styles';
import { useNavigate } from 'react-router-dom';
import { StyledText } from '../Text/StyledText';
import back from '../../assets/back.svg';

const NavbarVerification: React.FC = () => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<Nav>
			<BackButton onClick={handleBackClick}>
				<img src={back} alt="Back" width="24" height="24" />
			</BackButton>
			<TextContainer>
				<StyledText textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color="var(--Color-black, #000)">
					본인 인증
				</StyledText>
			</TextContainer>
		</Nav>
	);
};

export default NavbarVerification;
