import styled from 'styled-components';

export const ButtonWrapper = styled.div`
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	max-width: 32rem;
	height: 6.25rem;
	background-color: ${({ theme }) => theme.colors.white};
	justify-content: flex-end;
	z-index: 1;
	border: none;
`;

export const Button = styled.button<{ disabled: boolean }>`
	background-color: ${({ disabled, theme }) => (disabled ? theme.colors.gray3 : theme.colors.black)};
	border-radius: 0.625rem;
	font-size: 1rem;
	width: calc(100% - 2.5rem);
	height: 3.75rem;
	margin: 1.25rem;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	div {
		color: white;
	}

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray3};
	}
`;
