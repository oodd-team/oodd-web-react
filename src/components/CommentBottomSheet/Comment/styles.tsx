import styled from 'styled-components';

export const CommentLayout = styled.div<{ $isModal: boolean }>`
	margin: 1.38rem auto 1.25rem auto;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: ${({ $isModal }) => ($isModal ? '2.63rem' : '1.37rem')};
	text-align: center;
`;

export const SendContainer = styled.div`
	width: 100%;
	min-height: 2.5rem;
	display: flex;
	border: 1px solid ${({ theme }) => theme.colors.border.active};
	border-radius: 0.5rem;
	align-items: center;
`;

export const CommentTextarea = styled.textarea`
	width: 100%;
	padding: 0.62rem;
	padding-right: 0;
	border: none;
	outline: none;
	background-color: transparent;
	resize: none;
	overflow: hidden;
	color: ${({ theme }) => theme.colors.text.primary};
	${({ theme }) => theme.fontStyles['body2-regular']};
`;

export const SendButton = styled.button`
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 0.62rem;
`;
