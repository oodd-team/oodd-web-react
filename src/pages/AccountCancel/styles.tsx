import styled from 'styled-components';

interface ButtonProps {
	isChecked: boolean;
}

export const CancelContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	flex-grow: 1; /* flexbox에서 공간을 채우도록 설정 */
	padding: 1.25rem; /* 20px */
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
`;

export const Text = styled.p`
	font-size: 0.875rem; /* 14px */
	margin-bottom: 1.25rem; /* 20px */
	text-align: left;
	margin-top: 16px;
`;

export const InfoBox = styled.div`
	background: #f5f5f5;
	padding: 1.25rem; /* 20px */
	margin-bottom: 1.25rem; /* 20px */
`;

export const InfoItem = styled.p`
	font-size: 0.875rem; /* 14px */
	margin-bottom: 0.625rem; /* 10px */
`;

export const CheckboxWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1.25rem; /* 20px */

	input[type='checkbox'] {
		margin-right: 0.625rem; /* 10px */
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
