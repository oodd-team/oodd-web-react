import styled from 'styled-components';

export const NavBarContainer = styled.nav`
	height: 88px;
	justify-content: center;
	align-items: center;
	bottom: 0;
	background-color: white;
	max-width: 512px;
	margin: 0;
	border-radius: 20px 20px 0 0;
	filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
`;

export const NavBarWrapper = styled.div`
	display: flex;
	margin: 8px 57px 0;
	justify-content: space-between;
`;

export const IconWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 32px;
	height: 43px;
	cursor: pointer;

	p {
		margin: 0;
		bottom: 0;
		color: black;
		text-align: center;
		font-family: 'Pretendard Variable', sans-serif;
		font-size: 9px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
`;

export const IconImg = styled.img`
	width: 32px;
	height: 32px;
`;
