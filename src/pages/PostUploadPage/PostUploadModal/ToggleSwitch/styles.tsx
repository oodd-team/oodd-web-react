import styled from 'styled-components';

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	appearance: none;
	position: relative;
	border: 1.5px solid ${({ theme }) => theme.colors.gray3};
	border-radius: 10px;
	width: 35px;
	height: 20px;
	margin: 0;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 17px;
		height: 17px;
		border-radius: 50%;
		background-color: ${({ theme }) => theme.colors.gray3};
		transition: left 250ms linear;
	}

	&:checked {
		background-color: black;
		border-color: black;
	}

	&:checked::before {
		background-color: white;
		left: 15px;
	}
`;
