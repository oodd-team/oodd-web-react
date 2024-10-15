import styled from 'styled-components';
import theme from '../../../styles/theme';

export const TabContainer = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid ${theme.colors.gray3};
`;
export const Tab = styled.div<{ active: boolean }>`
	flex: 1;
	text-align: center;
	padding: 16px 0;
	cursor: pointer;
	font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
	border-bottom: ${(props) => (props.active ? '2px solid black' : 'none')};
	color: var(--Color-black, #000);
	text-align: center;
	font-family: 'Pretendard Variable';
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 150%; /* 24px */
`;

export const ContentContainer = styled.div`
	padding: 16px;
`;

export const UserItem = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 0;
	border-bottom: 1px solid #eee;
`;
