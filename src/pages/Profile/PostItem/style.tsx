import { styled } from 'styled-components';

export const PostItemLayout = styled.article`
	flex: 1 1 calc(50% - 0.5rem); /* 기본적으로 두 개씩 배치되도록 설정 */
	width: 100%;
	max-width: 67.5rem; /* 최대 너비 설정 */
	aspect-ratio: 1 / 1; /* 정사각형 유지 */
	display: flex;
	flex-direction: column;
	position: relative; /* LikesOverlay 위치 조정을 위한 설정 */
	box-sizing: border-box;

	@media (min-width: 23.4375rem) {
		&:nth-child(2n + 1):last-child {
			flex: 0 1 calc(50% - 0.5rem); /* 마지막 게시물이 남을 때 왼쪽에 위치 */
			margin-right: auto; /* 오른쪽 여백을 자동으로 설정하여 왼쪽 정렬 */
		}
	}

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
	bottom: 0.625rem; /* 하단에 배치 */
	right: 0.625rem;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	gap: 5px;
`;

export const Pin = styled.img`
	display: flex;
	position: absolute;
	top: 0.75rem;
	left: 0.75rem;
	justify-content: center;
	align-items: center;
`;
