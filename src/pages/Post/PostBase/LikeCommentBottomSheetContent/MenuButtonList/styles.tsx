import { styled } from 'styled-components';

export const MenuListWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const MenuListContainer = styled.div<{ $position: { top: number; left: number } }>`
	position: absolute;
	top: ${({ $position }) => `${$position.top}px`};
	left: ${({ $position }) => `${$position.left}px`};
	z-index: 1000;
	width: 120px;
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.gray[200]};
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const MenuButtonItem = styled.button<{ $color?: string }>`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border: none;
	height: 36px;
	width: 120px;
	padding: 0 10px;
	cursor: pointer;
	color: ${(props) => props.$color || props.theme.colors.white};
	border-bottom: 1px solid ${({ theme }) => theme.colors.white};

	img {
		width: 16px;
		height: 16px;
	}

	&:last-child {
		border-bottom: none;
	}
`;
