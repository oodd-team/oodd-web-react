import styled from 'styled-components';

export const CommentBottomSheetLayout = styled.div`
	${({ theme }) => theme.visibleOnMobileTablet};
`;

export const CommentModalLayout = styled.div`
	${({ theme }) => theme.visibleOnDesktop};
`;

export const CommentModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 900;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const CommentModalContainer = styled.div`
	position: fixed;
	width: 39.4375rem;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 999;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 0.38rem;
	background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const CommentModalHeader = styled.header`
	display: flex;
	width: 100%;
	height: 3.75rem;
	padding: 0.875rem 0.625rem 1rem 0.9375rem;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.38rem 0.38rem 0 0;
	background: ${({ theme }) => theme.colors.brand.gradient};
`;

export const CommentModalBox = styled.section`
	display: flex;
	padding: 2.5rem 2.19rem 1.25rem 2.19rem;
	width: 100%;
`;

export const CloseButton = styled.button`
	width: 1.875rem;
	height: 1.875rem;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0.5;
`;
