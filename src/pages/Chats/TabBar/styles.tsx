import styled from 'styled-components';

export const TabBarLayout = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 0;
	flex: 1;
`;

export const TabBarContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
`;

export const TabBarList = styled.ul`
	display: flex;
	flex: 1;
	justify-content: space-between;
`;

export const TabBarWrapper = styled.li<{ $isSelected: boolean; $isPointer: boolean }>`
	border-bottom: 0.13rem solid #e9e9e9;
	border-image: ${({ $isSelected, theme }) => ($isSelected ? `${theme.colors.gradient} 0 0 1 0` : 'transparent')};
	text-align: center;
	flex-grow: 1;
	padding: 0.62rem;
	padding-bottom: 0.4rem;
	cursor: ${({ $isPointer }) => ($isPointer ? 'pointer' : '')};
`;

export const Tabs = styled.div`
	width: 100%;
	height: 100%;

	.swiper {
		height: 100%;
	}

	.swiper-slider {
		height: 100%;
		overflow-y: scroll;
		padding-bottom: 0.7rem;

		&::-webkit-scrollbar {
			display: none;
		}
	}
`;
