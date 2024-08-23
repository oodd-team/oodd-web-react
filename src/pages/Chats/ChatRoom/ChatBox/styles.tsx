import styled from 'styled-components';

// background-color gray0(#f5f5f5)이 theme에 없음
export const ChatBoxContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	max-width: 32rem;
	display: flex;
	gap: 1.12rem;
	padding: 0.688rem 1.12rem 2rem 1.5rem;
	background-color: #f5f5f5;
	border-top: 1px solid ${({ theme }) => theme.colors.gray2};
	align-items: center;
`;

export const Textarea = styled.textarea<{ $isOpponentValid: boolean }>`
	width: 100%;
	height: 2.5rem;
	max-height: 5rem;
	border: 1px solid ${({ theme }) => theme.colors.gray3};
	border-radius: 0.188rem;
	padding: 0.7rem 0.5rem;
	outline: none;
	resize: none;
	overflow: hidden;
	color: ${({ theme }) => theme.colors.black};
	cursor: ${({ $isOpponentValid }) => ($isOpponentValid ? '' : 'not-allowed')};
	background-color: transparent;
	font-family: 'Pretendard Variable';
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: 120%; /* 0.9rem */
`;

export const SendIcon = styled.img<{ $isOpponentValid: boolean }>`
	width: 1.5rem;
	height: 1.5rem;
	cursor: ${({ $isOpponentValid }) => ($isOpponentValid ? 'pointer' : '')};
	margin-right: 0.75rem;
`;