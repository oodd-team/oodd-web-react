import { styled } from 'styled-components';

import { StyledText } from '@components/Text/StyledText';

export const OODDFrame = styled.div`
	width: 100%;
	height: 100vh; // 화면 전체 높이 차지
	overflow: hidden; // 전체 화면 스크롤 방지
	display: flex;
	flex-direction: column;
`;

export const PickMyStyleLayout = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 1.875rem;
	flex: 1; // 남은 공간을 다 차지하도록 설정
	width: 100%;
	height: 100%;
	overflow: hidden; // 상위 요소의 스크롤 방지
`;

export const StyledTitle = styled(StyledText)`
	margin: 0.625rem 0;
`;

export const StyledSubTitle = styled(StyledText)`
	margin-bottom: 1.25rem;
`;

export const CategoryList = styled.div`
	width: 100%;
	max-width: 31.25rem;
	margin: auto;
	flex-grow: 1;
	overflow-y: auto;
	padding-bottom: 6.25rem;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.625rem;

	// 스크롤바 숨기기
	&::-webkit-scrollbar {
		display: none;
	}
	scrollbar-width: none;
`;

export const PlaceholderImage = styled.div<{ $isClicked: boolean }>`
	width: 100%;
	aspect-ratio: 1;
	background-color: lightgray;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.875rem;
	border-radius: 0.5rem;
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;

	transform: ${({ $isClicked }) => ($isClicked ? 'scale(0.9)' : 'scale(1)')};
	box-shadow: ${({ $isClicked }) => ($isClicked ? '0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)' : 'none')};

	&:hover {
		transform: ${({ $isClicked }) => ($isClicked ? 'scale(0.9)' : 'scale(0.95)')};
	}
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0.5rem;
	}
`;
