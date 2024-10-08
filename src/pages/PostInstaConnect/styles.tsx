import styled from 'styled-components';

export const UploadContainer = styled.div`
	flex-grow: 1;
	height: 100vh;
	width: 100%;
	position: relative;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: calc(100% - 10rem);
	position: absolute;
	top: 2.75rem;
	left: 0;

	.tab-to-write {
		margin-bottom: 5rem;
	}
`;

export const StyledInput = styled.input`
	min-width: 12.5rem;
	height: 2.5rem;
	padding: 0;
	margin: 6.25rem 0 0.9375rem 0;
	border: none;
	font-family: 'Gmarket Sans';
	font-weight: 400;
	font-size: 2rem;
	text-align: center;

	&:focus {
		outline: none;
	}

	::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 2rem;
	}

	/* Firefox */
	&:-moz-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 2rem;
	}

	/* Internet Explorer 10-11 */
	&:-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 2rem;
	}

	/* Edge */
	&::-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 2rem;
	}

	/* Safari */
	&::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 2rem;
	}
`;
