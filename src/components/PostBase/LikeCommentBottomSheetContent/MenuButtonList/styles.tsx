import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const MenuListContainer = styled.div<{ isVisible: boolean }>`
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	display: flex;
	flex-direction: row;
	gap: 4px;
	animation: ${(props) => (props.isVisible ? slideIn : 'none')} 0.3s ease forwards;
`;

export const MenuButtonItem = styled.button<{ color?: string }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 4px;
	background-color: ${({ theme }) => theme.colors.gray1};
	border: none;
	height: 100%;
	width: 80px;
	padding: 8px 12px;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.2s ease;
	color: ${(props) => props.color || props.theme.colors.white};

	img {
		width: 20px;
		height: 20px;
		padding-top: 4px;
	}
`;
