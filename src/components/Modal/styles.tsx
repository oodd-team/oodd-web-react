import styled from 'styled-components';

export const ModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalContainer = styled.div<{ $isCloseButtonVisible: boolean }>`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 1rem;
	width: 21.25rem;
	max-width: calc(100% - 2.5rem);
	max-height: 30%;
	padding: 1.25rem;
	${({ $isCloseButtonVisible }) => ($isCloseButtonVisible ? 'padding-top: 2.5rem' : '')};
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 0.625rem;
	box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.1);
	z-index: 999;
`;

export const CloseButton = styled.button`
	width: 1.88rem;
	height: 1.88rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 1.25rem;
	right: 1.25rem;
`;

export const ConfirmButton = styled.button`
	display: flex;
	min-width: 7.125rem;
	padding: 0.625rem 0.875rem;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.gradient};
	border-radius: 0.5rem;
	color: white;
	${({ theme }) => theme.fontStyles['body1-medium']}
`;
