import styled from 'styled-components';

export const ChatRoomListLayout = styled.div`
	width: 100%;
	padding: 0.5rem 1.25rem;
	height: 4rem;
	display: flex;
	margin: 0 auto;
	cursor: pointer;
`;

export const ChatRoomUsername = styled.div`
	font-family: 'Gmarket Sans';
	font-size: 15px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const UserImage = styled.img`
	width: 3rem;
	height: 3rem;
	object-fit: cover;
	border-radius: 1.5rem;
`;

export const LeftBox = styled.div`
	margin: 0.4rem 0.5rem 0.25rem 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

export const RightBox = styled.div<{ $isUnread: boolean }>`
	margin: 0.1rem 0 0.1rem auto;
	text-align: right;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	opacity: ${(props) => (props.$isUnread ? '0.5' : '1')};
`;
