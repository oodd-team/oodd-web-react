import styled from 'styled-components';

interface ButtonProps {
	isChecked: boolean;
}

export const CancelContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	flex-grow: 1; /* flexbox에서 공간을 채우도록 설정 */
	display: flex;
	flex-direction: column;
`;

export const SubTitle = styled.h3`
	font-size: 1rem; /* 16px */
	font-weight: bold;
	margin-bottom: 0.625rem; /* 10px */
	text-align: center;
	text-align: left;
	margin-top: 10px;
	padding: 1.25rem; /* 20px */
`;

export const Text = styled.p`
	font-size: 0.875rem; /* 14px */
	margin-bottom: 5px; /* 20px */
	text-align: left;
	margin-top: 10px;
	padding: 0rem 1.25rem; /* 20px */
`;

export const InfoBox = styled.div`
	background: #f5f5f5;
	padding: 70px; /* 20px */
	margin-top: 10px;
	border-radius: 10px;
	margin: 10px 20px 1.25rem 20px; /* 10px 위 여백, 20px 좌우 여백, 20px 아래 여백 */
`;

export const InfoItem = styled.p`
	font-size: 0.875rem; /* 14px */
	margin-bottom: 0.625rem; /* 10px */
	padding: 2px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100%; /* 부모 컨테이너의 높이에 맞추기 */
`;

export const CheckboxWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.25rem;
	padding: 0rem 15px;

	input[type='checkbox'] {
		margin-right: 0.625rem; /* 10px */
	}
`;

export const CheckboxInput = styled.input`
	margin-right: 0.625rem;
	cursor: pointer;
	appearance: none; /* 기본 스타일 제거 */
	width: 1.25rem;
	height: 1.25rem;
	border: 0.125rem solid #e0e0e0;
	border-radius: 0.25rem;
	position: relative;
	&:checked {
		background-color: #ffbbda;
		border-color: #ff2389;
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

export const StyledButton = styled.button<ButtonProps>`
	margin-top: 18.75rem; /* 300px */
	background: ${(props) => (props.isChecked ? 'black' : '#ccc')};
	border-radius: 0.5rem; /* 8px */
	border: none;
	padding: 1.5625rem; /* 25px */
	text-align: center;
	font-size: 1rem; /* 16px */
	color: white;
	cursor: ${(props) => (props.isChecked ? 'pointer' : 'not-allowed')};

	&:disabled {
		background: #00000080;
	}
`;
