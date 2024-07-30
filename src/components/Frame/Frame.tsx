import styled from 'styled-components';

// 공통 레이아웃 -> 모두 적용해주세요
export const OODDFrame = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	max-width: 32rem;
	height: auto;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;
