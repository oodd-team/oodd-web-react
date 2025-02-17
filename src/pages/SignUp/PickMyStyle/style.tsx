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
	flex-grow: 1; // 남은 공간을 전부 차지하게 설정
	overflow-y: auto; // 내부에서만 스크롤 가능하도록 설정
	padding-bottom: 6.25rem; // 스크롤 여유 공간 추가

	// 스크롤바 숨기기
	&::-webkit-scrollbar {
		display: none; // 크롬, 사파리
	}
	scrollbar-width: none; // 파이어폭스
`;

export const StyledCategory = styled(StyledText)`
	display: flex;
	width: content-fit;
	padding: 0.1875rem;
	border-radius: 0.3125rem;
	border: 0.0625rem solid ${({ theme }) => theme.colors.brand.primary};
	background-color: ${({ theme }) => theme.colors.brand.primaryLighter};
`;
export const CategoryItem = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 0.9375rem;
	margin-bottom: 0.625rem;
`;

export const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 0.625rem;
	margin-top: 0.625rem;
	cursor: pointer;
`;

export const PlaceholderImage = styled.div`
	width: 12.5rem;
	height: 13.75rem;
	background: lightgray;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-weight: bold;
	border-radius: 0.3125rem;
`;
