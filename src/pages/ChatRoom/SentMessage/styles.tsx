import styled from 'styled-components';

export const MessageLayout = styled.div`
	display: flex;
	margin: 0 0 0.5rem auto;
	justify-content: flex-end;
`;

export const Message = styled.div`
	padding: 0.45rem 0.75rem 0.45rem 1rem;
	border-radius: 0.625rem 0 0.625rem 0.625rem;
	max-width: 16rem;
	background-color: ${({ theme }) => theme.colors.gray1};
`;

export const TimeWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	margin-right: 0.5rem;
	color: ${({ theme }) => theme.colors.gray3};
	font-family: 'Pretendard Variable';
	font-size: 0.5625rem;
	font-style: normal;
	font-weight: 400;
	line-height: 120%; /* 0.675rem */
`;
