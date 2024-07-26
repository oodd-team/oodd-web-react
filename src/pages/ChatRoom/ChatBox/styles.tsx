import styled from 'styled-components';

export const ChatBoxContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	max-width: 32rem;
	display: flex;
	gap: 18px;
	padding: 11px 32px 32px 24px;
	background-color: #f5f5f5;
	border-top: 1px solid #c4c4c4;
	align-items: center;
`;

export const Textarea = styled.textarea`
	width: 100%;
	height: 40px;
	border: 1px solid #7b7b7b;
	border-radius: 3px;
	padding: 0.6rem 0.5rem;
	outline: none;
	resize: none;
	overflow: hidden;
`;

export const SendIcon = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	background-color: gray;
`;
