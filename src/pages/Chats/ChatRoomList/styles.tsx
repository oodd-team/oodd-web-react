import styled from 'styled-components';

export const ChatRoomListLayout = styled.div`
	width: 100%;
	padding: 0.5rem 1.25rem;
	height: 4rem;
	display: flex;
	margin: 0 auto;
	cursor: pointer;
`;

export const UserImage = styled.img`
	width: 3rem;
	height: 3rem;
	object-fit: cover;
	border-radius: 1.5rem;
`;

export const LeftBox = styled.div`
	margin: 0.4rem 0.5rem 0.2rem 1.06rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const RightBox = styled.div<{ $isUnread: boolean }>`
	margin: 0 0 auto auto;
	text-align: right;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	opacity: ${(props) => (props.$isUnread ? '0.5' : '1')};
`;
