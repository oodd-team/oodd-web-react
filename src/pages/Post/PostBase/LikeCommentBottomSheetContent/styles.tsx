import { styled } from 'styled-components';

import theme from '@styles/theme';

import { StyledText } from '@components/Text/StyledText';

import { UserProfile } from '../styles';

export const TabContainer = styled.div`
	display: flex;
	justify-content: space-around;
`;
export const Tab = styled.div<{ $active: boolean }>`
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
		background: ${(props) => (props.$active ? theme.colors.brand.gradient : 'none')};
	}
`;

export const ContentContainer = styled.div<{ $isCommentTab: boolean }>`
	padding: 16px 0;
	min-height: 350px;
	max-height: 750px;
	display: flex;
	gap: 16px;
	flex-direction: column;
	justify-content: start;
	overflow-y: auto;

	/* Comment 탭일 때만 padding-bottom 추가 */
	padding-bottom: ${(props) => (props.$isCommentTab ? '100px' : '0')};

	scrollbar-width: none;
	-ms-overflow-style: none;
	&::-webkit-scrollbar {
		display: none;
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

export const LikeItem = styled.div`
	display: flex;
	align-items: center;
	width: 100%;

	.name {
		margin-left: 8px;
	}
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
	border-top: 1px solid ${({ theme }) => theme.colors.border.devider};

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

		scrollbar-width: none; // Firefox
		-ms-overflow-style: none; // IE 10+
		&::-webkit-scrollbar {
			display: none; // Safari & Chrome
		}
	}

	button {
		background: ${({ theme }) => theme.colors.brand.gradient};
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
