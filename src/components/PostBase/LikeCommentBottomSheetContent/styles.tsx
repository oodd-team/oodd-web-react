import styled from 'styled-components';
import theme from '../../../styles/theme';

export const TabContainer = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 0 20px;
`;
export const Tab = styled.div<{ active: boolean }>`
	flex: 1;
	text-align: center;
	padding: 16px 0;
	cursor: pointer;
	position: relative; /* ::after를 위해 필요한 설정 */

	/* 활성화된 탭의 경우 */
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px; /* 하단 경계선 두께 */
		background: ${(props) => (props.active ? theme.colors.gradient : 'none')};
	}
`;

export const ContentContainer = styled.div`
	padding: 16px;
`;

export const Content = styled.div`
	min-height: 350px;
	height: auto;
`;

export const UserItem = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 0;
`;
