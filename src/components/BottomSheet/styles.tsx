import styled from 'styled-components';

interface OverlayProps {
	$isOpen: boolean;
}

interface BottomSheetContainerProps {
	$isOpen: boolean;
}

interface TabButtonProps {
	$isActive: boolean;
}

export const BottomSheetContainer = styled.div<BottomSheetContainerProps>`
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

export const Tab = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 1rem; /* 16px */
	border-bottom: 1px solid #eee;
`;

export const TabButton = styled.button<TabButtonProps>`
	background: none;
	border: none;
	font-size: 1rem; /* 16px */
	cursor: pointer;
	${({ $isActive }) =>
		$isActive &&
		`
        font-weight: bold;
        border-bottom: 2px solid black;
    `}
`;

export const TabContent = styled.div`
	padding: 1rem; /* 16px */
`;

export const LikesList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const CommentsList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const UserRow = styled.div`
	display: flex;
	align-items: center;
	padding: 0.5rem 0; /* 8px 0 */
	display: flex;
	align-items: center;
	margin-bottom: 0.625rem; /* 10px */
`;

export const Pic = styled.div`
	width: 2.25rem; /* 36px */
	height: 2.25rem; /* 36px */
	margin-right: 0.5rem; /* 8px */
	svg {
		width: 100%;
		height: 100%;
	}
`;

export const UserID = styled.div`
	font-size: 1rem; /* 16px */
`;

export const PostDetailContainer = styled.div`
	padding: 1.25rem; /* 20px */
`;

export const UserInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.25rem; /* 20px */
`;

export const Pic_exam = styled.div`
	width: 2.25rem; /* 36px */
	height: 2.25rem; /* 36px */
	margin-right: 0.625rem; /* 10px */
	svg {
		width: 100%;
		height: 100%;
	}
`;

export const Text = styled.div`
	font-size: 0.875rem; /* 14px */
	color: #666;
`;

export const Menu = styled.div`
	position: absolute;
	top: 1.25rem; /* 20px */
	right: 1.25rem; /* 20px */
	cursor: pointer;
`;

export const ImageWrapper = styled.div`
	margin-top: 1.25rem; /* 20px */
`;

export const Image = styled.img`
	width: 100%;
	height: auto;
`;
