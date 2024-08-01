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
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 20px;
	right: 20px;
	width: 80px;
	height: 80px;
	border: none;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.black};
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	font-size: 16px;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray3};
	}
`;
