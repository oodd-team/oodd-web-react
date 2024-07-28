import styled from 'styled-components';

export const ChatListLayout = styled.div`
	width: 100%;
	padding: 0 1.25rem;
	height: 3rem;
	display: flex;
	margin: 0 auto;
	margin-bottom: 1rem;
	cursor: pointer;
`;

export const UserImage = styled.img`
	width: 3rem;
	height: 3rem;
	object-fit: cover;
	border-radius: 1.5rem;
`;

export const LeftBox = styled.div`
	margin: 0.313rem 0 0.25rem 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const RightBox = styled.div`
	margin: 0 0 auto auto;
	text-align: right;
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;
