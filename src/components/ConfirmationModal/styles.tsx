import styled from 'styled-components';

export const ConfirmationModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.2);
`;

export const ConfirmationModalLayout = styled.div`
	position: fixed;
	bottom: 0;
	display: flex;
	flex-direction: column;
	width: 21.375rem;
	height: 14.25rem;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	border-radius: 0.75rem;
	background-color: white;
	z-index: 200;
`;

export const ContentBox = styled.div`
	display: flex;
	padding-top: 24px;
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const ButtonContainer = styled.div`
	bottom: 0;
	display: flex;
	justify-content: center;
	margin: auto;
	border-top: 1px solid #c4c4c4;
	width: 100%;
	height: 50px;
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	height: 100%;
`;
