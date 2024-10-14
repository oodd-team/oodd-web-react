import styled from 'styled-components';
import { StyledText } from '../../../../components/Text/StyledText';

export const PostItemContainer = styled.article`
	flex: 1 1 calc(50% - 0.5rem); /* 기본적으로 두 개씩 배치되도록 설정 */
	width: 100%;
	max-width: 1080px; /* 최대 너비 설정 */
	aspect-ratio: 1 / 1; /* 정사각형 유지 */
	display: flex;
	flex-direction: column;
	position: relative; /* LikesOverlay 위치 조정을 위한 설정 */
	box-sizing: border-box;
	@media (max-width: 33.125rem) {
		flex: 1 1 calc(50% - 0.5rem); /* 작은 화면에서도 두 개씩 배치되도록 설정 */
		max-width: 50%; /* 화면 크기에 따라 너비를 조정하여 두 개씩 배치 */
		height: auto; /* 높이 자동 조정 */
		aspect-ratio: 1 / 1; /* 작은 화면에서도 정사각형 유지 */
	}
`;

export const PostImageContainer = styled.figure`
	width: 100%;
	height: 100%;
	border-radius: 0.5rem;
	position: relative;
	overflow: hidden; /* 이미지 잘리지 않도록 */
	cursor: pointer;
`;

export const PostImage = styled.img`
	width: 100%;
	height: 100%; /* 높이 100%로 설정하여 비율 유지 */
	object-fit: cover; /* 이미지가 컨테이너를 덮도록 설정, 잘릴 수 있음 */
`;

export const LikesOverlay = styled.div`
	position: absolute;
	bottom: 0; /* 하단에 배치 */
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	box-sizing: border-box;
`;

export const HeartIcon = styled.img`
	margin-bottom: 0.5rem;
`;

export const LikesCountStyledText = styled(StyledText)`
	margin: 0 1.3125rem 0.5rem 0.375rem;
`;

export const PinSvg = styled.img`
	display: flex;
	position: absolute;
	top: 0.75rem;
	left: 1.25rem;
	justify-content: center;
	align-items: center;
`;
