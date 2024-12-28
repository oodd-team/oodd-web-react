import styled from 'styled-components';

export const VerificationWrapper = styled.div`
	margin: 0 auto;
	width: 100%;
	flex-grow: 1; 
	padding: 1.25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Container = styled.div`
	margin-top: 5px; 
	padding: 1rem;
`;

export const Title = styled.h1`
	font-size: 1.125rem;
	margin-bottom: 1.25rem;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Input = styled.input`
	padding: 0.625rem;
	border: 1px solid ${({ theme }) => theme.colors.gray[300]};
	border-radius: 0.25rem;
	font-size: 1rem;
	width: 100%;
`;

export const InputWrapper = styled.div`
	position: relative;
	width: 100%;
	margin-bottom: 1.25rem;
`;

export const Button = styled.button`
	width: 100%;
	padding: 1.25rem;
	margin-top: 300px;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.white};
	background-color: ${({ theme, disabled }) =>
  disabled ? theme.colors.gray[300] : theme.colors.black};
	border: none;
	border-radius: 0.3125rem;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	&:hover {
		background-color: ${({ theme, disabled }) =>
  		disabled ? theme.colors.gray[300] : theme.colors.gray[700]};
	}
`;

export const VerificationInputWrapper = styled.div`
	position: relative;
	width: 100%;
	margin-top: 1.25rem;
`;

export const VerificationInput = styled.input`
	padding: 0.625rem;
	border: 1px solid ${({ theme }) => theme.colors.gray[300]};
	border-radius: 0.25rem;
	font-size: 1rem;
	width: 100%;
`;

export const Timer = styled.div`
	position: absolute;
	right: 0.625rem;
	top: 50%;
	transform: translateY(-50%);
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.red || theme.colors.brand.primary};
`;

export const ResendButton = styled.button`
	position: absolute;
	right: 0.625rem;
	top: 50%;
	transform: translateY(-50%);
	padding: 0.625rem;
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.black};
	background: none;
	border: none;
	cursor: pointer;
`;

export const StyledInput = styled.input`
	padding: 0.625rem;
	border: 1px solid ${({ theme }) => theme.colors.gray[300]};
	border-radius: 0.25rem;
	font-size: 1rem;
	width: 100%;
`;
export const StyledVerificationInput = styled.input`
	padding: 0.625rem;
	border: 1px solid ${({ theme }) => theme.colors.gray[300]};
	border-radius: 0.25rem;
	font-size: 1rem;
	width: 100%;
`;
