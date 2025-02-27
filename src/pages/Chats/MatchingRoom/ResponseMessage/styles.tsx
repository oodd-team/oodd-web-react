import { styled } from 'styled-components';

export const ResponseContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	justify-content: flex-end;
`;

export const ResponseButton = styled.button<{ $isPending: boolean }>`
	cursor: ${({ $isPending }) => `${$isPending ? 'pointer' : 'default'}`};
	padding: 0.4rem 0.8rem;
	margin: 0.5rem 0;
	background-color: #f2f2f2;
	border-radius: 0.5rem;
	overflow-wrap: break-word;
`;
