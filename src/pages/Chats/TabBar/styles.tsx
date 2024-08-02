import styled from 'styled-components';

export const TabBarLayout = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 0;
	flex: 1;
`;

export const TabBarContainer = styled.div`
	width: 100%;
	height: 2.5rem;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	padding: 0 1.25rem;
	border-bottom: solid 1px;
`;

export const TabBox = styled.div<{ $isActive: boolean }>`
	flex: 1;
	text-align: center;
	cursor: pointer;
	border-bottom: solid 2px ${({ $isActive, theme }) => ($isActive ? theme.colors.black : 'transparent')};
`;
