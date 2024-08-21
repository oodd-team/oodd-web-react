import styled from 'styled-components';

export const MessagesContainer = styled.div`
	width: 100%;
	overflow-y: scroll;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 1rem 0.875rem 0 1.25rem;
	margin: 0 auto 5.2rem auto;
	scroll-behavior: smooth;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.colors.gray1};
	}

	&::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) => theme.colors.gray2};
	}
`;
