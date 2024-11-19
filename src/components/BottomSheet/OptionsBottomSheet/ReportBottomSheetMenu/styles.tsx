import styled from 'styled-components';

export const InputLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	textarea {
		display: block;
		width: 100%;
		height: 6.25rem;
		border-radius: 0.5rem;
		border: 0.0625rem solid #ededed;
		margin-bottom: 1rem
		margin-top: -10px;
		outline: none;
		padding: 0.8125rem 0.9375rem;
		${({ theme }) => theme.fontStyles['body1-medium']};
		line-height: 1.25%;
		color: #1d1d1d;
		background-color: #f8f8f8;
		resize: none;
	}
`;
