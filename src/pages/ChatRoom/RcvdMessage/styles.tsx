import styled from 'styled-components';

export const FirstMessageLayout = styled.div`
	display: flex;
	margin: 0 auto 8px 0;
`;

export const MessageLayout = styled.div`
	display: flex;
	margin: 0 auto 8px 47px;
`;

export const UserImage = styled.img`
	width: 40px;
	height: 40px;
	object-fit: cover;
	border-radius: 20px;
	margin-right: 7px;
`;

export const MessageBox = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Message = styled.div`
	padding: 11px;
	border-radius: 0 10px 10px 10px;
	background-color: #e9e9e9;
	max-width: 16rem;
	margin-right: 8px;
`;

export const TimeWrapper = styled.div`
	display: flex;
	align-items: flex-end;
`;
