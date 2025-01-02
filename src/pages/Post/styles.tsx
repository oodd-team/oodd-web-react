import { styled } from 'styled-components';

export const InputLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	textarea {
		display: block;
		width: calc(100% - 3rem);
		height: 5.75rem;
		border-radius: 0.125rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.gray[600]};
		margin-bottom: 5.875rem;
		z-index: 2;
		margin-top: -3.75rem;
		outline: none;
		padding: 0.8125rem 0.9375rem;
		font-family: 'Pretendard Variable';
		font-size: 1rem;
		font-style: normal;
		font-weight: 300;
		line-height: 150%;
		color: ${({ theme }) => theme.colors.text.primary};
		resize: none;
	}
`;
