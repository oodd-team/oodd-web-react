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

	:nth-child(2) {
		color: ${({ theme }) => theme.colors.black};
		margin: 0 auto;
	}
`;

export const PrevButton = styled.button`
	position: absolute;
	left: 20px;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
`;
