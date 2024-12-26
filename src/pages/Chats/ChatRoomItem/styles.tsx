import styled from 'styled-components';
import { StyledText } from '@components/Text/StyledText';

export const ChatRoomItemLayout = styled.li`
	width: 100%;
	display: grid;
	grid-template-columns: auto 1fr auto;
	margin: 0 auto;
	cursor: pointer;
`;

export const UserImage = styled.img`
	width: 3.25rem;
	height: 3.25rem;
	object-fit: cover;
	border-radius: 50%;
	box-shadow:
		0px 1px 2px 0px rgba(0, 0, 0, 0.12),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08);
`;

export const LeftBox = styled.div`
	margin: 0.2rem 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	overflow: hidden;
`;

export const LatestMessage = styled(StyledText)`
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	overflow-wrap: break-word;
	text-overflow: ellipsis;
`;

export const RightBox = styled.div`
	margin: 0.1rem 0 0.1rem auto;
	text-align: right;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
