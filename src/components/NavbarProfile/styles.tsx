import styled from 'styled-components';

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	margin-left: 0.8125rem;
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	margin-right: 18px;
	a {
		display: flex;
		align-items: center;
	}

	img {
		width: 1.5rem; /* 24px */
		height: 1.5rem; /* 24px */
	}
`;
