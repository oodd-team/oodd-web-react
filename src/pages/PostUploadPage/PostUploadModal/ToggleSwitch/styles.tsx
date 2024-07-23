import styled from 'styled-components';

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	appearance: none;
	position: relative;
	border: 1.5px solid gray;
	border-radius: 1.35em;
	width: 35px;
	height: 22px;
	margin: 5px;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 19px;
		height: 19px;
		border-radius: 50%;
		background-color: gray;
		transition: left 250ms linear;
	}

	&:checked {
		background-color: black;
		border-color: black;
	}

	&:checked::before {
		background-color: white;
		left: 1em;
	}
`;
