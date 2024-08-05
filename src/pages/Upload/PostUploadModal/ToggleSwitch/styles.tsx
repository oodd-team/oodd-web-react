import styled from 'styled-components';

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	appearance: none;
	position: relative;
	border: 0.0938rem solid ${({ theme }) => theme.colors.gray3};
	border-radius: 0.625rem;
	width: 2.1875rem;
	height: 1.25rem;
	margin: 0;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 1.0625rem;
		height: 1.0625rem;
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
		left: 0.9375rem;
	}
`;
