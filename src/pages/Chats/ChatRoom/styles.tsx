import styled from 'styled-components';

// OODDFrame height: 100vh
// GlobalStyles body margin-bottom: 0 환경에서 테스트
export const MessagesContainer = styled.div`
	width: 100%;
	overflow-y: scroll;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 1rem 0.875rem 0 1.25rem;
	margin: 2.75rem auto 5.2rem auto;
	scroll-behavior: smooth;

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.colors.gray1};
	}

	&::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) => theme.colors.gray2};
	}
`;
