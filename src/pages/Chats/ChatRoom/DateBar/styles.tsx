import { styled } from 'styled-components';

import { StyledText } from '@components/Text/StyledText';

export const DatebarLayout = styled.div`
	display: flex;
	width: 100%;
	margin: 1.2rem auto 1rem auto;
	gap: 0.5rem;
`;

export const Date = styled(StyledText)`
	height: fit-content;
	white-space: nowrap;
`;

export const Divider = styled.hr`
	width: 100%;
`;
