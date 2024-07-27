import styled from 'styled-components';

export const Header = styled.div`
	width: 100%;
	height: 44px;
	margin: auto;
	margin-top: 54px;
	padding: 0 20px;
`;

export const TabbarLayout = styled.div`
	width: 100%;
	height: 40px;
	margin: auto;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	padding: 0 20px;
	border-bottom: solid 1px #0000004d;
`;

export const TabBox = styled.div<{ $isActive: boolean }>`
	flex: 1;
	text-align: center;
	cursor: pointer;
	border-bottom: ${(props) => (props.$isActive ? 'solid 2px #000000' : '')};
`;

export const RecentChat = styled.div`
	margin: 14px auto 19px auto;
	padding-left: 20px;
	width: 100%;
`;
