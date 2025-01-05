import { styled } from 'styled-components';

import { StyledText } from '@components/Text/StyledText';

export const CancelContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

export const SubTitle = styled.h3`
	font-size: 1rem;
	font-weight: bold;
	margin-bottom: 0.625rem;
	text-align: center;
	text-align: left;
	margin-top: 10px;
	padding: 1.25rem;
`;

export const Text = styled.p`
	font-size: 0.875rem;
	margin-bottom: 5px;
	text-align: left;
	margin-top: 10px;
	padding: 0rem 1.25rem;
`;

export const InfoBox = styled.div`
	background: ${({ theme }) => theme.colors.background.secondary};
	padding: 70px;
	margin-top: 10px;
	border-radius: 10px;
	margin: 10px 20px 1.25rem 20px;
`;

export const InfoItem = styled.p`
	font-size: 0.875rem;
	margin-bottom: 0.625rem;
	padding: 2px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100%;
`;

export const CheckboxWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.25rem;
	padding: 0rem 15px;

	input[type='checkbox'] {
		margin-right: 0.625rem;
	}
`;

export const CheckboxInput = styled.input`
	margin-right: 0.625rem;
	cursor: pointer;
	appearance: none;
	width: 1.25rem;
	height: 1.25rem;
	border: 0.125rem solid ${({ theme }) => theme.colors.border.divider};
	border-radius: 0.25rem;
	position: relative;
	&:checked {
		background-color: ${({ theme }) => theme.colors.brand.primaryLight};
		border-color: ${({ theme }) => theme.colors.brand.primary};
	}

	&:checked::after {
		content: '✓';
		color: ${({ theme }) => theme.colors.text.contrast};
		font-size: 0.875rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const Label = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

export const StyledCheckboxText = styled(StyledText)`
	color: ${({ theme }) => theme.colors.text.caption};
`;
