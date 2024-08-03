import styled from 'styled-components';

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: calc(100% - 160px);
	position: absolute;
	top: 60px;
	left: 0;

	.tab-to-write {
		margin-bottom: 80px;
	}
`;

export const StyledInput = styled.input`
	min-width: 200px;
	height: 40px;
	padding: 0;
	margin: 100px 0 15px 0;
	border: none;
	font-family: 'Gmarket Sans';
	font-weight: 400;
	font-size: 32px;
	text-align: center;

	&:focus {
		outline: none;
	}

	::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 32px;
	}

	/* Firefox */
	&:-moz-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 32px;
	}

	/* Internet Explorer 10-11 */
	&:-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 32px;
	}

	/* Edge */
	&::-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 32px;
	}

	/* Safari */
	&::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Gmarket Sans';
		font-weight: 400;
		font-size: 32px;
	}
`;
