import styled from 'styled-components';

export const Header = styled.div`
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	align-items: center;
	background-color: white;
	z-index: 1;
`;

export const PrevButton = styled.button`
	position: absolute;
	left: 20px;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
`;

export const Text = styled.span`
	font-size: 16px;
	color: ${({ theme }) => theme.colors.gray3};
	margin: 0 auto;
`;
