import styled from 'styled-components';

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ModalContent = styled.div`
	background: #fff;
	border-radius: 0.625rem; /* 10px */
	text-align: center;
	max-width: 21.375rem; /* 342px */
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 1.25rem 0; /* 20px 0 */
	width: 21.375rem; /* 342px */
	height: 9.375rem; /* 150px */
	flex-shrink: 0;
`;

export const ModalButtonContainer = styled.div`
	display: flex;
	width: 100%;
	border-top: 1px solid #eee;
`;

export const ModalButton = styled.button`
	flex: 1;
	padding: 0.625rem; /* 10px */
	font-size: 0.875rem; /* 14px */
	cursor: pointer;

	&:first-child {
		border-right: 1px solid #eee;
		color: #000;
	}

	&:last-child {
		color: red;
	}
`;
