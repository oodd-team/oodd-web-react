import styled from 'styled-components';

// HomeContainer

export const HomeContainer = styled.div`
	flex-grow: 1;
	height: auto;
`;

// HomeTopBar

export const HomeTopBarContainer = styled.div`
	width: 100%;
	max-width: 32rem;
	height: 2.75rem;
	display: flex;
	justify-content: space-between;
	background-color: white;
	z-index: 10;
	align-items: center;
	position: fixed;
	width: 100%;
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

export const TabLayout = styled.div`
	display: flex;
	flex-direction: column;
`;

export const HomeTabBarLayout = styled.div`
	position: fixed;
	width: 100%;
	background-color: white;
	z-index: 10;
	max-width: 32rem;
	top: 2.75rem;
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

export const Tabs = styled.div`
	margin-top: 5.25rem;
	z-index: 0;
`;
