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
	max-height: 750px;
	display: grid;
	grid-template-columns: 1fr;
	gap: 16px;
	flex-direction: column;
	align-items: start;
	overflow-y: auto;
	scrollbar-width: none; // Firefox
	-ms-overflow-style: none; // IE 10+
	&::-webkit-scrollbar {
		display: none; // Safari & Chrome
	}
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
	width: 100%;

	.name {
		margin-left: 8px;
	}
`;

export const CommentItem = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;

	&:last-child {
		margin-bottom: 110px;
	}
`;

export const CommentContent = styled.div`
	margin-left: 8px;
	display: flex;
	flex-direction: column;
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

export const CommentDeleteButton = styled.button`
	background: red;
	color: white;
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 50px;
	text-align: center;
	border: none;
	cursor: pointer;
`;

export const InputLayout = styled.div`
	position: absolute;
	width: calc(100% - 40px);
	padding: 20px 0;
	bottom: 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 10px;
	background-color: white;

	textarea {
		flex: 1;
		display: block;
		width: 100%;
		height: 50px;
		max-height: 70px;
		border-radius: 8px;
		border: 0.0625rem solid #ededed;
		outline: none;
		padding: 0.8125rem 0.9375rem;
		font-family: 'Pretendard Variable';
		font-size: 1rem;
		font-style: normal;
		font-weight: 300;
		line-height: 150%;
		color: #1d1d1d;
		background-color: #f8f8f8;
		resize: none;
		overflow-y: auto;
	}

	button {
		background: ${({ theme }) => theme.colors.gradient};
		width: 50px;
		height: 50px;
		border-radius: 8px;
		color: ${({ theme }) => theme.colors.white};
		border: none;
		font-size: 0.875rem;
	}

	button:disabled {
		background-color: #ccc; /* 비활성화된 버튼의 색상 */
		cursor: not-allowed;
	}
`;
