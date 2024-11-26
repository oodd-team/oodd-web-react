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
	display: flex;
	flex-direction: column;
	gap: 8px;
	animation: ${(props) => (props.isVisible ? slideIn : 'none')} 0.3s ease forwards;
`;

export const MenuButton = styled.button<{ backgroundColor?: string }>`
	display: flex;
	align-items: center;
	gap: 8px;
	background-color: ${(props) => props.backgroundColor || 'white'};
	border: none;
	padding: 8px 12px;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${(props) => props.backgroundColor || '#f0f0f0'};
	}

	img {
		width: 16px;
		height: 16px;
	}

	span {
		font-size: 0.875rem;
		color: #333;
	}
`;
