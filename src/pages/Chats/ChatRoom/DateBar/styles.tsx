import styled from 'styled-components';

export const DatebarLayout = styled.div`
	display: flex;
	width: 100%;
	margin: 1.2rem auto 1rem auto;
	gap: 0.5rem;
`;

export const DateWrapper = styled.div`
	height: fit-content;
	white-space: nowrap;
`;

export const Divider = styled.hr`
	width: 100%;
	height: 1px;
	color: ${({ theme }) => theme.colors.gray2};
`;
