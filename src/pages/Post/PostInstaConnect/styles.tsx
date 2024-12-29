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
	text-align: center;

	${({ theme }) => theme.fontStyles['title1-regular']}

	&:focus {
		outline: none;
	}

	::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		${({ theme }) => theme.fontStyles['title1-regular']}
	}

	/* Firefox */
	&:-moz-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		${({ theme }) => theme.fontStyles['title1-regular']}
	}

	/* Internet Explorer 10-11 */
	&:-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		${({ theme }) => theme.fontStyles['title1-regular']}
	}

	/* Edge */
	&::-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		${({ theme }) => theme.fontStyles['title1-regular']}
	}

	/* Safari */
	&::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		${({ theme }) => theme.fontStyles['title1-regular']}
	}
`;
