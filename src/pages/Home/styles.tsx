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
	z-index: 20;
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
