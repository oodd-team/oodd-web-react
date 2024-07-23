import styled from 'styled-components';

export const Header = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 60px;
	background-color: white;
	position: fixed;
	top: 0;
	left: 0;
`;

export const PrevButton = styled.button`
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
	position: absolute;
	left: 20px;
`;

export const Text = styled.span`
	font-size: 16px;
	color: ${({ theme }) => theme.colors.gray3};
	margin: 0 auto;
`;
