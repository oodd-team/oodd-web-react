import styled from 'styled-components';

export const CommentLayout = styled.div`
	margin: 5.9rem auto 2.5rem auto;
	padding: 0 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	text-align: center;
`;

export const SendContainer = styled.div`
	padding: 0.75rem;
	width: 100%;
	min-height: 3rem;
	display: flex;
	border: 1px solid ${({ theme }) => theme.colors.gray3};
	border-radius: 0.19rem;
	background-color: #f5f5f5;
`;

export const CommentTextarea = styled.textarea`
	width: 100%;
	margin: auto;
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
	width: 1.5rem;
	height: 1.5rem;
	opacity: 0.5;
	cursor: pointer;
`;
