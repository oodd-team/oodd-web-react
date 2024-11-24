import styled from 'styled-components';
import { StyledText } from '../../components/Text/StyledText';

export const TermsAgreementContainer = styled.main`
	display: flex;
	flex-direction: column;
	padding: 30px;
	gap: 20px;
`;
export const BackButton = styled.img`
	width: 30px;
	height: 30px;
	cursor: pointer;
`;

export const CheckboxWrapper = styled.div`
	margin-top: 20px;
`;

export const CheckboxItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

export const CheckboxInput = styled.input`
	margin-right: 10px;
	cursor: pointer;
	appearance: none; /* 기본 스타일 제거 */
	width: 20px;
	height: 20px;
	border: 2px solid #e0e0e0;
	border-radius: 4px;
	position: relative;
	&:checked {
		background-color: #ffbbda;
		border-color: #ff2389;
	}
	&:checked::after {
		content: '✓';
		color: white;
		font-size: 14px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /* 정확히 중앙으로 배치 */
	}
`;

export const Divider = styled.hr`
	border: none;
	border-top: 1px solid #e0e0e0;
	margin: 10px 0;
`;

export const StyledTitle = styled(StyledText)`
	display: flex;
`;
