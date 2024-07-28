import styled from 'styled-components';

export const TopbarLayout = styled.div`
	position: fixed;
	top: 0;
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	width: 100%;
	max-width: 32rem;
	height: 2.75rem;
	justify-contents: space-evenly;
	align-items: center;
	border-bottom: solid 1px ${({ theme }) => theme.colors.gray2};
`;

export const BackButton = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	cursor: pointer;
	background-size: cover;
	background-position: center;
	margin: auto;
	margin-left: 0.813rem;
`;

export const KebabMenu = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	cursor: pointer;
	background-size: cover;
	background-position: center;
	margin: auto;
	margin-right: 1.125rem;
`;
