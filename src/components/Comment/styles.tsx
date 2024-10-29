import styled from 'styled-components';

export const CommentLayout = styled.div<{ $isModal: boolean | undefined }>`
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
	border: 1px solid #ffdeed;
	border-radius: 0.5rem;
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
	font-family: 'Pretendard Variable';
	font-size: 1rem;
	font-style: normal;
	font-weight: 300;
	line-height: 1.2rem;
`;

export const SendImg = styled.img`
	margin: 0 auto;
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
	margin-right: 0.62rem;
`;
