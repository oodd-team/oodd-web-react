import styled from 'styled-components';

export const TabBarLayout = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 0;
	flex: 1;
`;

export const TabBarContainer = styled.div`
	width: 100%;
	height: 40px;
	margin: 0 auto;
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
