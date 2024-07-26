import styled from 'styled-components';

export const MessageLayout = styled.div`
	display: flex;
	margin: ${(props) => (props.$isFirst ? '36px' : 0)} 0px 8px auto;
	justify-content: flex-end;
`;

export const Message = styled.div`
	padding: 11px 11px 11px 16px;
	border-radius: 10px 0 10px 10px;
	max-width: 16rem;
	background-color: #e9e9e9;
`;

export const TimeWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	margin-right: 8px;
`;
