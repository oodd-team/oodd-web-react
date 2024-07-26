import styled from 'styled-components';

export const ChatListLayout = styled.div`
	width: 100%;
	padding: 0 20px;
	height: 48px;
	display: flex;
	margin: auto;
	margin-bottom: 16px;
	cursor: pointer;
`;

export const UserImage = styled.img`
	width: 48px;
	height: 48px;
	object-fit: cover;
	border-radius: 24px;
`;

export const LeftBox = styled.div`
	margin: 5px 0 4px 20px;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const RightBox = styled.div`
	margin: 0 0 auto auto;
	text-align: right;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;
