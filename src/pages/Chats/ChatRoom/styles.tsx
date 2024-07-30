import styled from 'styled-components';

// TODO: MessagesContainer 내부에 scroll 만드려면 height 설정 필요
export const MessagesContainer = styled.div`
	width: 100%;
	overflow: auto;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 1rem 1.25rem 0 1.25rem;
	margin: 2.75rem auto 5.2rem auto;
`;
