import styled from 'styled-components';

export const ImageDragDropContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	height: calc(100% - 160px);
	position: absolute;
	top: 60px;
	left: 0;

	div {
		margin-bottom: 120px;
	}

	svg {
		font-size: 80px;
		color: ${({ theme }) => theme.colors.gray3};
	}

	:nth-child(2) {
		margin-bottom: 100px;
	}

	&.active svg {
		color: ${({ theme }) => theme.colors.black};
	}

	input {
		display: none;
	}
`;
