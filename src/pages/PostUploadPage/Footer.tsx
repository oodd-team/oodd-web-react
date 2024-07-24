import styled from 'styled-components';

export const Footer = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100px;
	background-color: ${({ theme }) => theme.colors.white};
	justify-content: flex-end;
	z-index: 1;
`;

export const Button = styled.button`
	background-color: black;
	border-radius: 10px;
	font-size: 16px;
	cursor: pointer;
	width: calc(100% - 40px);
	height: 60px;
	margin: 20px;

	div {
		color: white;
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray3};
	}
`;
