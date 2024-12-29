import { styled } from 'styled-components';

export const ReportBottomSheetMenuWrappar = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const InputLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.background.primary};
	padding: 0 1rem;
	margin-bottom: 6.25rem;
	margin-top: -1rem;

	textarea {
		display: block;
		width: 100%;
		height: 5.25rem;
		padding: 0.8rem 0.9375rem;
		outline: none;
		border-radius: 0.5rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.border.divider};
		${({ theme }) => theme.fontStyles['body1-medium']};
		color: ${({ theme }) => theme.colors.text.primary};
		background-color: ${({ theme }) => theme.colors.background.secondary};
		resize: none;

		&::placeholder {
			color: ${({ theme }) => theme.colors.text.tertiary};
			${({ theme }) => theme.fontStyles['body2-regular']};
		}
	}
`;
