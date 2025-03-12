import { styled } from 'styled-components';

export const Button = styled.button`
	width: 90%;
	margin: 1rem auto;
	height: 3.1rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.brand.primary};
	cursor: pointer;
	box-sizing: border-box;
	border: 0.0625rem solid;
	border-radius: 0.625rem;
	padding: 0.625rem;
	padding-inline: 1rem;
`;
