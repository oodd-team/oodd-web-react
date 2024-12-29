import styled from 'styled-components';
import theme from '@styles/theme';

export const OODDFrame = styled.div`
	${theme.breakPoints};
	background-color: ${({ theme }) => theme.colors.background.primary};
	height: 100vh;
	margin: auto;
	display: flex;
	flex-direction: column;
	position: relative;
`;
