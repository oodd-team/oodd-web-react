import styled from 'styled-components';
import theme from '../../styles/theme';

// 공통 레이아웃 -> 모두 적용해주세요
export const OODDFrame = styled.div`
	${theme.breakPoints};
	background-color: ${({ theme }) => theme.colors.white};
	height: 100vh;
	margin: auto;
	display: flex;
	flex-direction: column;
`;
