import styled from 'styled-components';

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

	div {
		margin-bottom: 30px;
	}

	svg {
		font-size: 80px;
		color: ${({ theme }) => theme.colors.gray3};
		margin-top: 30px;
	}

	input {
		display: none;
	}
`;
