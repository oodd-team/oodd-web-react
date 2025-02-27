import { styled } from 'styled-components';

import { StyledText } from '@components/Text/StyledText';

export const FirstMessageLayout = styled.div<{ $isSenderChanged: boolean }>`
	display: flex;
	margin: 0 auto 0.5rem 0;
	margin-top: ${({ $isSenderChanged }) => ($isSenderChanged ? '1rem' : 0)};
`;

export const MessageLayout = styled.div`
	display: flex;
	margin: 0 auto 0.5rem 2rem;
`;

export const UserImage = styled.img`
	width: 1.5rem;
	height: 1.5rem;
	object-fit: cover;
	border-radius: 1.25rem;
	margin-right: 0.5rem;
	cursor: pointer;
`;

export const UsernameText = styled(StyledText)`
	cursor: pointer;
`;

export const MessageBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	/* max-width: 75%; */
	margin-right: 0.5rem;
`;

export const Message = styled(StyledText)`
	padding: 0.4rem 0.8rem;
	background-color: #f2f2f2;
	border-radius: 0 0.8rem 0.8rem 0.8rem;
	overflow-wrap: break-word;
`;

export const TimeWrapper = styled.time`
	display: flex;
	align-items: flex-end;
	color: ${({ theme }) => theme.colors.text.caption};
	font-family: 'Pretendard Variable';
	font-size: 0.5625rem;
	font-style: normal;
	font-weight: 400;
	line-height: 120%; /* 0.675rem */
`;
