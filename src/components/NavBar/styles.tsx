import styled from 'styled-components';

export const NavBarContainer = styled.nav`
	height: 5.5rem;
	justify-content: center;
	align-items: center;
	bottom: 0;
	background-color: white;
	max-width: 32rem;
	margin: 0;
	border-radius: 1.25rem 1.25rem 0 0;
	filter: drop-shadow(0rem 0rem 0.25rem rgba(0, 0, 0, 0.25));
`;

export const NavBarWrapper = styled.div`
	display: flex;
	margin: 0.5rem 3.563rem 0;
	justify-content: space-between;
`;

export const IconWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 2rem;
	height: 2.688rem;
	cursor: pointer;

	p {
		margin: 0;
		bottom: 0;
		color: black;
		text-align: center;
		font-family: 'Pretendard Variable', sans-serif;
		font-size: 0.563rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
`;

export const IconImg = styled.img`
	width: 2rem;
	height: 2rem;
`;
