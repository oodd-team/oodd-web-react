import styled from 'styled-components';
import { StyledText } from '../../../../components/Text/StyledText';

export const MessageLayout = styled.div`
	display: flex;
	margin: 0 0 0.5rem auto;
	justify-content: flex-end;
`;

export const Message = styled(StyledText)`
	padding: 0.4rem 0.8rem;
	background-color: #ffe9f3;
	border-radius: 0.8rem 0 0.8rem 0.8rem;
	max-width: 75%;
	overflow-wrap: break-word;
`;

export const TimeWrapper = styled.time`
	display: flex;
	align-items: flex-end;
	margin-right: 0.5rem;
	color: #8e8e93;
	font-family: 'Pretendard Variable';
	font-size: 0.5625rem;
	font-style: normal;
	font-weight: 400;
	line-height: 120%; /* 0.675rem */
`;
