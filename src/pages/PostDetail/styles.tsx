import styled from 'styled-components';

export const PostDetailContainer = styled.div`
	max-width: 512px; /* 32rem */
	margin: 0 auto;
	padding: 20px; /* 1.25rem */
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const UserInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start; /* 왼쪽 정렬 */
`;

export const UserRow = styled.div`
	display: flex;
	align-items: center; /* Pic_exam과 UserID를 수평으로 정렬 */
`;

export const UserID = styled.div`
	/* Body1/Medium */
	font-family: 'Gmarket Sans';
	font-size: 16px; /* 1rem */
	color: #000;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-left: 8px; /* 0.5rem */
`;

export const Pic_exam = styled.div`
	width: 36px; /* 2.25rem */
	height: 36px; /* 2.25rem */
	flex-shrink: 0;
	display: flex;
	padding: 0;
	margin-left: 0;
`;

export const Text = styled.div`
	color: var(--Color-black50, rgba(0, 0, 0, 0.5));
	font-family: 'Pretendard Variable';
	font-size: 12px; /* 0.75rem */
	font-style: normal;
	font-weight: 300;
	line-height: 1.2; /* 120% */
	margin-top: 4px; /* 0.25rem */
`;

export const Menu = styled.div`
	position: absolute;
	top: 70px; /* 4.375rem */
	right: 20px; /* 1.25rem */
	cursor: pointer;
`;

export const ImageWrapper = styled.div`
	margin-top: 20px; /* 1.25rem */
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const Image = styled.img`
	max-width: 512px; /* 32rem */
	height: auto;
	width: 390px;
	height: 519.3264px;
	flex-shrink: 0;
`;

export const IconRow = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 0;
`;

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;

	img {
		width: 24px; /* 아이콘 크기 */
		height: 24px;
		margin-right: 5px;
		margin-top: 5px;
	}

	span {
		font-size: 14px;
		color: #000; /* 텍스트 색상 */
		margin-right: 14px;
	}
`;

export const BrandBoxContainer = styled.div`
	display: flex;
	overflow-x: auto; /* 가로 스크롤 가능하도록 설정 */
	white-space: nowrap; /* 줄바꿈 없이 한 줄로 나열 */
	padding: 0.625rem 0;
	margin-top: 16px; /* 상단과의 간격 */

	&::-webkit-scrollbar {
		height: 0rem;
	}
`;

export const BrandBox = styled.div`
	display: inline-flex; /* inline-flex를 사용하여 가로 배치 유지 */
	align-items: center;
	padding: 0.625rem;
	border: 0.0625rem solid #7b7b7b;
	margin-right: 0.625rem;
	width: 15.3243rem; /* 지정된 너비 */
	height: 4.5rem; /* 지정된 높이 */
	flex-shrink: 0; /* 크기 고정 */

	img {
		width: 3.125rem;
		height: 3.125rem;
		margin-right: 0.625rem;
	}

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1; /* 텍스트 영역 확장 */
	}

	&:last-child {
		margin-right: 0;
	}

	.next-icon {
		width: 1.875rem; /* 아이콘 크기 */
		height: 19px;
		margin-left: auto; /* 자동으로 오른쪽 끝으로 배치 */
	}
`;

export const BrandLink = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;
