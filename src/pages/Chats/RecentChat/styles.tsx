import { styled } from 'styled-components';

import { StyledText } from '@components/Text/StyledText';

export const RecentChatInfo = styled(StyledText)`
	padding: 0.5rem 1.25rem;
	width: 100%;
`;

export const ChatRoomList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 0.62rem 1.25rem;
`;
