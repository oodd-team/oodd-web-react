import styled from 'styled-components';

export const Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 100px;
	position: fixed;
	bottom: 0;
	left: 0;
`;

export const Button = styled.button`
	background-color: black;
	color: white;
	border-radius: 10px;
	font-size: 16px;
	cursor: pointer;
	width: calc(100% - 40px);
	height: 60px;
	margin: 20px;

	&:hover {
		background-color: #333;
	}
`;
