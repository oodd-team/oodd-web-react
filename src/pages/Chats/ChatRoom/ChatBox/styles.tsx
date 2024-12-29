import { styled } from 'styled-components';
import SendIcon from '@assets/default/send-message.svg';

export const ChatBoxContainer = styled.div`
	${({ theme }) => theme.breakPoints};
	position: fixed;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;

	display: flex;
	padding: 0.5rem 1.12rem;
	background-color: ${({ theme }) => theme.colors.background.primary};
	gap: 0.5rem;
	border-top: 1px solid ${({ theme }) => theme.colors.gray[300]};
	align-items: center;
`;

export const Textarea = styled.textarea<{ $isOtherUserValid: boolean }>`
	width: 100%;
	max-height: 5rem;
	border: none;
	border-radius: 0.8rem;
	padding: 0.4rem 0.8rem;
	outline: none;
	resize: none;
	overflow: hidden;
	color: ${({ theme }) => theme.colors.text.primary};
	cursor: ${({ $isOtherUserValid }) => ($isOtherUserValid ? '' : 'not-allowed')};
	background-color: #f2f2f2;
	${({ theme }) => theme.fontStyles['body2-regular']};

	&::placeholder {
		color: ${({ theme }) => theme.colors.text.tertiary};
		${({ theme }) => theme.fontStyles['body2-regular']};
	}
`;

export const SendButton = styled.button<{ $isOtherUserValid: boolean }>`
	padding: 1.12rem;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.brand.primaryLight};
	background-image: url(${SendIcon});
	background-repeat: no-repeat;
	background-position: center;
	background-size: 1.2rem 1.2rem;
	cursor: ${({ $isOtherUserValid }) => ($isOtherUserValid ? 'pointer' : '')};
`;
