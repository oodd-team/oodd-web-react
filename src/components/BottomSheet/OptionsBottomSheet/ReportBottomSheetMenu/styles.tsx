import styled from 'styled-components';

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

	textarea {
		display: block;
		width: 100%;
		height: 5.25rem;
		border-radius: 0.5rem;
		border: 0.0625rem solid #ededed;
		margin-bottom: 5.25rem;
		margin-top: -1rem;
		outline: none;
		padding: 1rem 0.9375rem;
		${({ theme }) => theme.fontStyles['body1-medium']};
		line-height: 1.25%;
		color: #1d1d1d;
		background-color: #f8f8f8;
		resize: none;
	}
`;
