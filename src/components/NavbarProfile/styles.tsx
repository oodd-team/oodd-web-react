import styled from 'styled-components';

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	background-color: #fff;
	margin-left: -0.625rem; /* -10px */
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;

	a {
		display: flex;
		align-items: center;
	}

	img {
		width: 1.5rem; /* 24px */
		height: 1.5rem; /* 24px */
	}
`;
