import styled from 'styled-components';

export const ImageDragDropContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	height: calc(100% - 10rem);
	position: absolute;
	top: 2.75rem;
	left: 0;

	div {
		margin-bottom: 7.5rem;
	}

	svg {
		font-size: 5rem;
		color: ${({ theme }) => theme.colors.gray3};
	}

	:nth-child(2) {
		margin-bottom: 5rem;
	}

	&.active svg {
		color: ${({ theme }) => theme.colors.black};
	}

	input {
		display: none;
	}
`;
