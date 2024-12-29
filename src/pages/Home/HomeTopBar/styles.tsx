import { styled } from 'styled-components';

export const HomeTopBarContainer = styled.header`
	width: 100%;
	padding: 0.5rem 1.25rem;
	display: flex;
	justify-content: space-between;
	background-color: ${({ theme }) => theme.colors.background.primary};
	z-index: 20;
	align-items: center;
	position: fixed;
	${({ theme }) => theme.visibleOnMobileTablet};
`;

export const HomeLogo = styled.img`
	padding: 0.0938rem 0;
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 1rem;
`;

export const Button = styled.button`
	width: 1.125rem;
	height: 1.125rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0.03rem;
`;
