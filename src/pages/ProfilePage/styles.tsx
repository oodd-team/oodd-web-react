// src/pages/ProfilePage/styles.tsx
import styled from 'styled-components';

export const Overlay = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
	background: white;
`;

export const PageOverlay = styled.div`
	position: relative;
	max-width: 512px;
	width: 100%;
	height: 100%;
	background: white;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const AddButton = styled.button`
	position: absolute;
	bottom: 20px;
	right: 20px;
	width: 50px;
	height: 50px;
	border: none;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.black};
	color: white;
	font-size: 16px;
	line-height: 50px;
	text-align: center;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray3};
	}
`;
