import { styled } from 'styled-components';

import theme from '@styles/theme';

import { StyledText } from '@components/Text/StyledText';

export const TermsAgreementLayout = styled.main`
	display: flex;
	flex-direction: column;
	padding: 1.875rem;
	gap: 1.25rem;
`;
export const BackButton = styled.img`
	width: 1.875rem;
	height: 1.875rem;
	cursor: pointer;
`;

export const CheckboxList = styled.div`
	margin-top: 1.25rem;
`;

export const CheckboxItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.625rem;
`;

export const CheckboxInput = styled.input`
	margin-right: 0.625rem;
	cursor: pointer;
	appearance: none; /* 기본 스타일 제거 */
	width: 1.25rem;
	height: 1.25rem;
	border: 0.125rem solid ${theme.colors.border.divider};
	border-radius: 0.25rem;
	position: relative;
	&:checked {
		background-color: ${theme.colors.brand.primaryLighter};
		border-color: ${theme.colors.brand.primary};
	}
	&:checked::after {
		content: '✓';
		color: white;
		font-size: 0.875rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /* 정확히 중앙으로 배치 */
	}
`;

export const Divider = styled.hr`
	border: none;
	border-top: 0.0625rem solid ${theme.colors.border.divider};
	margin: 0.625rem 0;
`;

export const StyledTitle = styled(StyledText)`
	display: flex;
`;
