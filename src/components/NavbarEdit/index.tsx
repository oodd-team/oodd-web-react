import React from 'react';
import { Nav, TextContainer, BackButton } from './styles';
import { useNavigate } from 'react-router-dom';
import back from '../../assets/back.svg';
import { StyledText } from '../Text/StyledText';

const NavbarEdit: React.FC = () => {
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
				<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color="var(--Color-black, #000)">
					프로필 수정
				</StyledText>
			</TextContainer>
		</Nav>
	);
};

export default NavbarEdit;
