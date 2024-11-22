import styled from 'styled-components';
import { StyledText } from '../../Text/StyledText';
import theme from '../../../styles/theme';
import { UserProfile } from '../styles';

export const TabContainer = styled.div`
	display: flex;
	justify-content: space-around;
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
	padding: 16px 0;
	min-height: 350px;
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
	align-items: start;
`;

export const Content = styled(StyledText)`
	text-align: center;
	margin-top: 20px;
`;

export const BigUserProfile = styled(UserProfile)`
	width: 52px;
	height: 52px;
`;

export const UserItem = styled.div`
	display: flex;
	align-items: center;

	.name {
		margin-left: 8px;
	}
`;

export const CommentItem = styled.div`
	display: flex;
	align-items: center;
`;

export const CommentContent = styled.div`
	margin-left: 8px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const MenuBtn = styled.button`
	width: 18px;
	height: 18px;
	margin-left: auto;

	img {
		width: 100%;
		height: 100%;
	}
`;
