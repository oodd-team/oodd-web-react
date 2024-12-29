import { styled } from 'styled-components';

export const UploadContainer = styled.div`
	flex-grow: 1;
	height: 100vh;
	width: 100%;
	position: relative;
`;

export const ImageDragDropContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 2.75rem;
	left: 0;

	div {
		margin-bottom: 4.5rem;
	}

	svg {
		z-index: 2;
	}

	:nth-child(2) {
		margin-bottom: 9rem;
	}

	&.active svg {
		color: ${({ theme }) => theme.colors.black};
	}

	input {
		display: none;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 2.75rem;
	left: 0;
	width: 100%;
	//max-width: 512px;
	height: calc(100% - 10rem);
	flex: 1;
`;

export const HiddenFileInput = styled.input`
	display: none;
`;
