import styled from 'styled-components';

export const VerificationWrapper = styled.div`
	margin: 0 auto;
	width: 100%;
	flex-grow: 1; /* flexbox에서 공간을 채우도록 설정 */
	padding: 1.25rem; /* 20px */
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Container = styled.div`
	margin-top: 5px; /* TopBar 높이만큼 위로 밀기 */
	padding: 1rem;
`;

export const Title = styled.h1`
	font-size: 1.125rem;
	margin-bottom: 1.25rem;
s`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Input = styled.input`
	padding: 0.625rem;
	border: 1px solid #ccc;
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
	color: #fff;
	background-color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
	border: none;
	border-radius: 0.3125rem;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

	&:hover {
		background-color: ${({ disabled }) => (disabled ? '#ccc' : '#333')};
	}
`;

export const VerificationInputWrapper = styled.div`
	position: relative;
	width: 100%;
	margin-top: 1.25rem;
`;

export const VerificationInput = styled.input`
	padding: 0.625rem;
	border: 1px solid #ccc;
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
	color: red;
`;

export const ResendButton = styled.button`
	position: absolute;
	right: 0.625rem;
	top: 50%;
	transform: translateY(-50%);
	padding: 0.625rem;
	font-size: 0.875rem;
	color: #000;
	background: none;
	border: none;
	cursor: pointer;
`;

export const StyledInput = styled.input`
	padding: 0.625rem;
	border: 1px solid #ccc;
	border-radius: 0.25rem;
	font-size: 1rem;
	width: 100%;

	${({ theme }) => theme.fontStyles['heading1-regular']}

	&.body2-light {
		font-family: 'Pretendard Variable';
		font-weight: 300; // light
		font-size: 1rem; // 16px
	}
`;
export const StyledVerificationInput = styled.input`
	padding: 0.625rem;
	border: 1px solid #ccc;
	border-radius: 0.25rem;
	font-size: 1rem;
	width: 100%;

	&.body2-light {
		font-family: 'Pretendard Variable';
		font-weight: 300; // light
		font-size: 1rem; // 16px
	}
`;
