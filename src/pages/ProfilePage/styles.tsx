// src/pages/ProfilePage/styles.tsx
import styled from 'styled-components';

export const Overlay = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: white;
	width: 100%;
	height: 100%;
`;

export const PageOverlay = styled.div`
	position: relative;
	padding: 20px;
	max-width: 512px;
	width: 100%;
	background: white;
`;

export const AddButton = styled.button`
	position: fixed;
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
		background-color: ${({ theme }) => theme.colors.gray1};
	}
`;
