import styled from 'styled-components';

// HomeContainer

export const HomeContainer = styled.div`
	flex-grow: 1;
	height: auto;
`;

// HomeTopBar

export const HomeTopBarContainer = styled.div`
	width: auto;
	height: 44px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const HomeLogo = styled.img`
	width: 118px;
	height: 36px;
	background-color: #d9d9d9;
	margin-left: 20px;
	cursor: pointer;
`;

export const NotiIcon = styled.img`
	width: 24px;
	height: 24px;
	margin-right: 18px;
	cursor: pointer;
`;

// HomeTabBar

export const HomeTabBarLayout = styled.div`
	width: auto;
	height: 40px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;

export const HomeTabBarList = styled.ul`
	height: 40px;
	display: flex;
	gap: 20px;
	justify-content: space-between;
	margin: 0 20px;
`;

export const HomeTabBarWrapper = styled.li<{ $isSelected: boolean }>`
	margin-top: 16px;
	border-bottom: 2px solid ${({ $isSelected }) => ($isSelected ? 'black' : 'transparent')};
	text-align: center;
	flex-grow: 1;
	flex-basis: 0;
	cursor: pointer;
`;
