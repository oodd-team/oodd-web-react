import React from 'react';
import { Nav, TextContainer, Setting, BackButton } from './styles';
import { useNavigate } from 'react-router-dom';

const NavbarAccSetting: React.FC = () => {
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<Nav>
			<BackButton onClick={handleBackClick}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="back">
						<path
							id="Vector 201"
							d="M16.8938 2.98145L7.9502 11.925L16.8938 20.8686"
							stroke="black"
							strokeWidth="1.58997"
							strokeLinejoin="bevel"
						/>
					</g>
				</svg>
			</BackButton>
			<TextContainer>
				<Setting>계정 관리</Setting>
			</TextContainer>
		</Nav>
	);
};

export default NavbarAccSetting;
