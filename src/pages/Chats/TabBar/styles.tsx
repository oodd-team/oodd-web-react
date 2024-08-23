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
	border-bottom: 0.063rem solid ${({ theme }) => theme.colors.gray2};
`;

export const TabBarList = styled.ul`
	height: 2.5rem;
	display: flex;
	flex: 1;
	justify-content: space-between;
	margin: 0 1.25rem;
`;

export const TabBarWrapper = styled.li<{ $isSelected: boolean; $isPointer: boolean }>`
	margin-top: 1rem;
	border-bottom: 0.125rem solid ${({ $isSelected }) => ($isSelected ? 'black' : 'transparent')};
	text-align: center;
	flex-grow: 1;
	cursor: ${({ $isPointer }) => ($isPointer ? 'pointer' : '')};
`;

export const Tabs = styled.div`
	width: 100%;

	.swiper-container {
		height: 100vh - 10.75rem;
	}

	.swiper-slider {
		height: calc(100vh - 10.75rem);
		overflow-y: scroll;
		padding-bottom: 0.7rem;

		&::-webkit-scrollbar {
			display: none;
		}
	}
`;
