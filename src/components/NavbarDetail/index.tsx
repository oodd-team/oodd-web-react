import React from 'react';
import { Nav, TextContainer, UserID, OOTD, BackButton } from './styles';
import { useNavigate } from 'react-router-dom';

const NavbarDetail: React.FC = () => {
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
				<UserID>IDID</UserID>
				<OOTD>OOTD</OOTD>
			</TextContainer>
		</Nav>
	);
};

export default NavbarDetail;
