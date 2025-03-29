import { styled } from 'styled-components';

import { StyledText } from '@components/Text/StyledText';

export const PostLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;

	width: 100%;
	height: calc(100vh - 2.75rem);
	padding: 0 20px;
	padding-bottom: 6.5rem;
	overflow-y: scroll;

	scrollbar-width: none; // Firefox
	-ms-overflow-style: none; // IE 10+
	&::-webkit-scrollbar {
		display: none; // Safari & Chrome
	}

	&:last-child {
		padding-bottom: 110px;
	}
`;

export const PostInfoContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 8px;
	gap: 8px;
	align-self: stretch;

	.timeAgo {
		margin-left: auto;
	}
`;

export const UserProfile = styled.button`
	cursor: pointer;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	overflow: hidden;
	border: solid 0.5px ${({ theme }) => theme.colors.border.divider};

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const UserName = styled(StyledText)`
	cursor: pointer;
`;

export const MenuBtn = styled.button`
	width: 18px;
	height: 18px;
`;

export const PostContentContainer = styled.div`
	width: 100%;
`;

export const Content = styled(StyledText)<{ $showFullText: boolean }>`
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
	width: 100%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${({ $showFullText }) => ($showFullText ? 'unset' : '1')}; // 2줄 초과일 때 ...으로 표시
	text-overflow: ellipsis;
	white-space: normal;
`;

export const ShowMoreButton = styled(StyledText)`
	cursor: pointer;
	color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const IconRow = styled.div`
	display: flex;
	height: 20px;
	align-items: center;
	margin-right: auto;
	gap: 16px;
`;

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;
	height: 22px;

	span {
		font-size: 15px;
		color: ${({ theme }) => theme.colors.text.primary};
	}
`;

export const Icon = styled.div`
	width: 18px;
	height: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ClothingInfoList = styled.div`
	display: flex;
	margin-right: auto;
	flex-shrink: 0;
	overflow-x: auto;
	white-space: nowrap;
	gap: 16px;

	scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
	-ms-overflow-style: none; /* Internet Explorer에서 스크롤바 숨기기 */

	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
	}
`;

export const InputLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	textarea {
		display: block;
		width: calc(100% - 3rem);
		height: 5.75rem;
		border-radius: 0.125rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.border.divider};
		margin-bottom: 5.875rem;
		z-index: 2;
		margin-top: -3.75rem;
		outline: none;
		padding: 0.8125rem 0.9375rem;
		font-family: 'Pretendard Variable';
		font-size: 1rem;
		font-style: normal;
		font-weight: 300;
		line-height: 150%;
		color: ${({ theme }) => theme.colors.text.primary};
		resize: none;
	}
`;

export const UserNameWrapper = styled.div`
	margin-left: 10px;
	margin-top: 10px;
`;

export const PostWrapper = styled.div`
	width: 100%;
`;
