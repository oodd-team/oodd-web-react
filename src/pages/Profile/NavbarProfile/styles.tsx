import { styled } from 'styled-components';

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.5rem 1.25rem;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.text.contrast};
	z-index: 1000;
	position: sticky;
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	margin-right: 5px;

	a {
		display: flex;
		align-items: center;
	}

	img {
		width: 1.5rem;
		height: 1.5rem;
	}
`;
