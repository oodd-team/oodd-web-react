import styled from 'styled-components';

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	appearance: none;
	position: relative;
	border: 2px solid gray;
	border-radius: 1.35em;
	width: 2.25em;
	height: 1.35em;
	margin: 0;

	&::before {
		content: '';
		position: absolute;
		left: 0;
		width: 1.1em;
		height: 1.1em;
		border-radius: 50%;
		transform: scale(0.8);
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
