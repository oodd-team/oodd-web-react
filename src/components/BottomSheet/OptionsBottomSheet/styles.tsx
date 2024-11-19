import styled from 'styled-components';
import CloseIcon from '../../assets/default/modal-close-white.svg';

export const ReportBottomSheetLayout = styled.div`
	${({ theme }) => theme.visibleOnMobileTablet};
`;

export const ReportModalLayout = styled.div`
	${({ theme }) => theme.visibleOnDesktop};
`;

export const ReportModalWrapper = styled.div`
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

export const ReportModalContainer = styled.div`
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
	background-color: ${({ theme }) => theme.colors.white};
`;

export const ReportModalHeader = styled.header`
	display: flex;
	width: 100%;
	height: 3.75rem;
	padding: 0.875rem 0.625rem 1rem 0.9375rem;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.38rem 0.38rem 0 0;
	background: ${({ theme }) => theme.colors.gradient};
`;

export const ReportModalBox = styled.section`
	display: flex;
	padding: 2.5rem 2.19rem 1.5rem 2.19rem;
	width: 100%;
`;

export const XButton = styled.button`
	width: 1.875rem;
	height: 1.875rem;
	margin: auto 0 auto auto;
	background-image: url(${CloseIcon});
	background-repeat: no-repeat;
	background-size: 1.875rem;
	background-position: center;
	opacity: 0.5;
`;
