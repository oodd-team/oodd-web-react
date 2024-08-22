import styled from 'styled-components';

// HomeContainer

export const HomeContainer = styled.div`
	flex-grow: 1;
	height: auto;
	width: 100%;
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
`;

export const HomeLogo = styled.img`
	width: 6.6875rem;
	height: 1.6875rem;
	margin-left: 1.25rem;
	cursor: pointer;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
	}
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
	width: 100%;
	height: auto;
`;

export const HomeTabBarLayout = styled.div`
	position: fixed;
	width: 100%;
	max-width: 32rem;
	background-color: white;
	z-index: 10;
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

export const HomeTabBarWrapper = styled.li<{ $isSelected: boolean; $isPointer: boolean }>`
	margin-top: 1rem;
	border-bottom: 0.125rem solid ${({ $isSelected }) => ($isSelected ? 'black' : 'transparent')};
	text-align: center;
	flex-grow: 1;
	flex-basis: 0;
	cursor: ${({ $isPointer }) => ($isPointer ? 'pointer' : '')};
`;

export const Tabs = styled.div`
	margin-top: 5.25rem;
	z-index: 0;
	flex-grow: 1;
	height: 100%;
	.swiper-container {
		height: 100%;
	}
`;
