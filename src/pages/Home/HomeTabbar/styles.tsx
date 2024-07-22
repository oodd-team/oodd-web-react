import styled from 'styled-components';

export const HomeTabbarLayout = styled.div`
	width: auto;
	height: 40px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;

export const HomeTabbarUL = styled.ul`
	height: 40px;
	display: flex;
	gap: 20px;
	justify-content: space-between;
	margin: 0 20px;
`;

export const HomeTabbarWrapper = styled.li<{ $isSelected: boolean }>`
	margin-top: 16px;
	border-bottom: 2px solid ${({ $isSelected }) => ($isSelected ? 'black' : 'transparent')};
	text-align: center;
	flex-grow: 1;
	flex-basis: 0;
	cursor: pointer;
`;
