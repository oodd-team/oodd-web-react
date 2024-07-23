import styled from 'styled-components';

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
`;

export const ImageSelectorContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 100%;
	height: calc(100% - 160px);
	position: fixed;
	top: 60px;
	left: 0;

	svg {
		font-size: 80px;
		color: ${({ theme }) => theme.colors.gray3};
		margin-top: 30px;
	}
`;

export const ImagePlaceholder = styled.div`
	border: none;
	margin-top: 30px;
	font-size: 20px;
	color: ${({ theme }) => theme.colors.gray3};
`;

export const HiddenFileInput = styled.input`
	display: none;
`;
