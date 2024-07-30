import styled from 'styled-components';

export const FirstMessageLayout = styled.div`
	display: flex;
	margin: 0 auto 0.5rem 0;
`;

export const MessageLayout = styled.div`
	display: flex;
	margin: 0 auto 0.5rem 2.938rem;
`;

export const UserImage = styled.img`
	width: 2.5rem;
	height: 2.5rem;
	object-fit: cover;
	border-radius: 1.25rem;
	margin-right: 0.438rem;
`;

export const MessageBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const Message = styled.div`
	padding: 0.45rem 0.62rem 0.45rem 0.69rem;
	border-radius: 0 0.625rem 0.625rem 0.625rem;
	background-color: ${({ theme }) => theme.colors.gray1};
	max-width: 16rem;
	margin-right: 0.5rem;
`;

export const TimeWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	color: ${({ theme }) => theme.colors.gray3};
	font-family: 'Pretendard Variable';
	font-size: 0.5625rem;
	font-style: normal;
	font-weight: 400;
	line-height: 120%; /* 0.675rem */
`;
