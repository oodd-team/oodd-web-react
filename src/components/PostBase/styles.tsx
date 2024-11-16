import styled, { keyframes } from 'styled-components';
import { StyledText } from '../Text/StyledText';

// 그라데이션 애니메이션 정의
const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

// 공통된 로딩 스타일
const LoadingSkeleton = styled.div`
	background: linear-gradient(
		90deg,
		${({ theme }) => theme.colors.gray1} 25%,
		${({ theme }) => theme.colors.gray2} 50%,
		${({ theme }) => theme.colors.gray1} 75%
	);
	background-size: 200% 100%;
	animation: ${shimmer} 2s infinite;
	border-radius: 4px;
`;

export const PostContainer = styled.div`
	width: 100%;
	height: calc(100vh - 2.75rem);
	overflow-y: scroll;

	scrollbar-width: none; // Firefox
	-ms-overflow-style: none; // IE 10+
	&::-webkit-scrollbar {
		display: none; // Safari & Chrome
	}
`;

export const PostInfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 8px;
	margin-bottom: 16px;
	padding: 0 20px;
`;

export const UserInfo = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
`;

export const UserProfile = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 8px;
	background-color: ${({ theme }) => theme.colors.lightPink};

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const UserName = styled(StyledText)``;

export const MenuBtn = styled.button`
	width: 18px;
	height: 18px;
`;

export const PostContentContainer = styled.div`
	width: 100%;
	padding: 0 20px;
	margin-bottom: 16px;
`;

export const BaseContent = styled(LoadingSkeleton)`
	width: 100%;
	height: 16px;
	border-radius: 4px;
`;

export const Content = styled(StyledText)<{ showFullText: boolean }>`
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
	width: 100%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${({ showFullText }) => (showFullText ? 'unset' : '1')}; // 2줄 초과일 때 ...으로 표시
	text-overflow: ellipsis;
	white-space: normal;
`;

export const ShowMoreButton = styled(StyledText)``;

export const BaseImage = styled(LoadingSkeleton)`
	width: 100%;
	aspect-ratio: 4 / 5;
`;

export const IconRow = styled.div`
	display: flex;
	height: 20px;
	align-items: center;
	padding: 0 20px;
	margin: 16px 0;
`;

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;

	img {
		width: 20px;
		height: 20px;
	}

	span {
		font-size: 15px;
		color: #000;
		margin-right: 16px;
	}
`;

export const ClothingInfoList = styled.div`
	margin-top: 5px;
	margin-bottom: 88px;
	display: flex;
	overflow-x: auto;
	white-space: nowrap;
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
		border: 0.0625rem solid ${({ theme }) => theme.colors.gray3};
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
		color: ${({ theme }) => theme.colors.black};
		resize: none;
	}
`;
