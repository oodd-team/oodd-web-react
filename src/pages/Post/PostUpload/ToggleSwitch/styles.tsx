import { styled } from 'styled-components';

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	appearance: none;
	position: relative;
	border: 1.5px solid ${({ theme }) => theme.colors.brand.primary};
	border-radius: 28px;
	width: 52px;
	height: 28px;
	margin: 0;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: -1.5px;
		left: -1.5px;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background-color: ${({ theme }) => theme.colors.background.primary};
		border: 1.5px solid ${({ theme }) => theme.colors.border.active};
		transition: left 250ms linear;
	}

	&:checked {
		background: ${({ theme }) => theme.colors.brand.gradient};
		border: 1.5px solid ${({ theme }) => theme.colors.brand.gradient};
	}

	&:checked::before {
		background-color: ${({ theme }) => theme.colors.background.primary};
		left: 25px;
	}
`;
