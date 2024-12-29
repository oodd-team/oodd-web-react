import { styled } from 'styled-components';
import { StyledText } from '@components/Text/StyledText';

export const MessageLayout = styled.div<{ $isSenderChanged: boolean }>`
	display: flex;
	margin: 0 0 0.5rem auto;
	margin-top: ${({ $isSenderChanged }) => ($isSenderChanged ? '1rem' : 0)};
	justify-content: flex-end;
`;

export const Message = styled(StyledText)`
	padding: 0.4rem 0.8rem;
	background-color: ${({ theme }) => theme.colors.brand.primaryLight};
	/* border: 1.2px solid ${({ theme }) => theme.colors.brand.primaryLight}; */
	border-radius: 0.8rem 0 0.8rem 0.8rem;
	max-width: 75%;
	overflow-wrap: break-word;
`;

export const TimeWrapper = styled.time`
	display: flex;
	align-items: flex-end;
	margin-right: 0.5rem;
	color: ${({ theme }) => theme.colors.text.caption};
	font-family: 'Pretendard Variable';
	font-size: 0.5625rem;
	font-style: normal;
	font-weight: 400;
	line-height: 120%; /* 0.675rem */
`;
