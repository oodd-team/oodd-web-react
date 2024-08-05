import styled from 'styled-components';

interface OverlayProps {
	$isOpen: boolean;
}

interface MenuBottomContainerProps {
	$isOpen: boolean;
}

export const MenuBottomContainer = styled.div<MenuBottomContainerProps>`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: white;
	border-top-left-radius: 1rem; /* 16px */
	border-top-right-radius: 1rem; /* 16px */
	box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.1); /* 0 -2px 10px */
	transform: translateY(100%);
	transition: transform 0.3s ease-out;
	${({ $isOpen }) =>
		$isOpen &&
		`
        transform: translateY(0);
    `}
`;

export const Overlay = styled.div<OverlayProps>`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.5);
	opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
	visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
	transition:
		opacity 0.3s ease-out,
		visibility 0.3s ease-out;
`;

export const DragHandle = styled.div`
	width: 2.5rem; /* 40px */
	height: 0.25rem; /* 4px */
	background-color: #ccc;
	border-radius: 0.125rem; /* 2px */
	margin: 0.5rem auto; /* 8px */
`;

export const ActionList = styled.div`
	padding: 1rem; /* 16px */
`;

export const ActionItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.625rem 0; /* 10px 0 */
	border-bottom: 0.0625rem solid #eee; /* 1px */
	cursor: pointer;

	&:last-child {
		border-bottom: none;
	}
`;

export const ActionText = styled.div`
	font-size: 1rem; /* 16px */
`;

export const ActionIcon = styled.img`
	width: 1.25rem; /* 20px */
	height: 1.25rem; /* 20px */
`;
