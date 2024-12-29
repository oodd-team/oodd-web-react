import styled from 'styled-components';

export const Button = styled.button`
	width: 100%;
	margin: 16px auto;
	height: 3.1rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.brand.primary};
	cursor: pointer;
	box-sizing: border-box;
	border: 1px solid;
	border-radius: 10px;
	padding: 10px;
`;
