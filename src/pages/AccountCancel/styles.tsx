import styled from 'styled-components';

interface ButtonProps {
	isChecked: boolean;
}

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
	background: ${({ theme }) => theme.colors.gray[100]};
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
	border: 0.125rem solid ${({ theme }) => theme.colors.gray[200]};
	border-radius: 0.25rem;
	position: relative;
	&:checked {
	background-color: ${({ theme }) => theme.colors.brand.primaryLight};
	border-color: ${({ theme }) => theme.colors.brand.primary}; 
}

	&:checked::after {
		content: '✓';
		color: ${({ theme }) => theme.colors.white};
		font-size: 0.875rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); 
	}
`;

export const StyledButton = styled.button<ButtonProps>`
	margin-top: 18.75rem; 
	background: ${({ theme, isChecked }) =>
	isChecked ? theme.colors.black : theme.colors.gray[300]};
	border-radius: 0.5rem; 
	border: none;
	padding: 1.5625rem; 
	text-align: center;
	font-size: 1rem; 
	color: ${({ theme }) => theme.colors.white};
	cursor: ${(props) => (props.isChecked ? 'pointer' : 'not-allowed')};

	&:disabled {
		background: ${({ theme }) => `${theme.colors.black}80`};
	}
`;
