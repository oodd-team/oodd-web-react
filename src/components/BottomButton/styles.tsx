import { styled } from 'styled-components';

export const ButtonWrapper = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	height: 6.25rem;
	background-color: ${({ theme }) => theme.colors.background.primary};
	justify-content: flex-end;
	z-index: 1;
	border: none;
`;

export const Button = styled.button<{ disabled: boolean }>`
	background: ${(
		{ disabled, theme }, //theme에 없어서 그냥 뒀음
	) => (disabled ? 'linear-gradient(93deg, #FFC1D6 1.22%, #F8D4D4 99.73%)' : theme.colors.brand.gradient)};
	border-radius: 0.625rem;
	font-size: 1rem;
	width: calc(100% - 2.5rem);
	height: 3.75rem;
	margin: 1.25rem;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	div {
		color: white;
	}
`;
