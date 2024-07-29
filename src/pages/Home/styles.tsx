import styled from 'styled-components';

// HomeContainer

export const HomeContainer = styled.div`
	flex-grow: 1;
	height: auto;
`;

// HomeTopBar

export const HomeTopBarContainer = styled.div`
	width: auto;
	height: 2.75rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const HomeLogo = styled.img`
	width: 7.375rem;
	height: 2.25rem;
	background-color: #d9d9d9;
	margin-left: 1.25rem;
	cursor: pointer;
`;

export const NotiIcon = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 1.125rem;
	cursor: pointer;
`;

// HomeTabBar

export const HomeTabBarLayout = styled.div`
	width: auto;
	height: 2.5rem;
	border-bottom: 0.063rem solid ${({ theme }) => theme.colors.gray2};
`;

export const HomeTabBarList = styled.ul`
	height: 2.5rem;
	display: flex;
	gap: 1.25rem;
	justify-content: space-between;
	margin: 0 1.25rem;
`;

export const HomeTabBarWrapper = styled.li<{ $isSelected: boolean }>`
	margin-top: 1rem;
	border-bottom: 0.125rem solid ${({ $isSelected }) => ($isSelected ? 'black' : 'transparent')};
	text-align: center;
	flex-grow: 1;
	flex-basis: 0;
	cursor: pointer;
`;
