import styled from 'styled-components';

export const ModalWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
`;

export const ModalContent = styled.div`
	width: 21.25rem;
	max-width: calc(100% - 2.5rem);
	height: 14.375rem;
	max-height: 40%;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 0.625rem;
	box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.1);
	z-index: 999;

	> div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 75%;
		border-bottom: solid 0.0625rem ${({ theme }) => theme.colors.gray2};
	}

	button {
		width: 100%;
		height: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		> div {
			color: rgba(255, 0, 0, 1);
		}
	}
`;
