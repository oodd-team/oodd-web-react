import styled from 'styled-components';

export const MessagesContainer = styled.div<{ $isLoading: boolean }>`
	visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
	width: 100%;
	overflow-y: scroll;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 1.25rem 1.25rem 0 1.25rem;
	margin: 0 auto 3.2rem auto;
	scroll-behavior: smooth;
`;
