import styled from 'styled-components';

export const ModalWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
`;

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 21.25rem;
	max-width: calc(100% - 2.5rem);
	height: 10rem;
	max-height: 30%;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 0.625rem;
	box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.1);
	z-index: 999;
`;
