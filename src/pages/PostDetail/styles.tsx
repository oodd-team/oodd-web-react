import styled from 'styled-components';

export const PostDetailContainer = styled.div`
	max-width: 32rem; /* 512px */
	margin: 0 auto;
	padding: 1.25rem; /* 20px */
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
	font-size: 1rem; /* 16px */
	color: #000;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-left: 0.5rem; /* 8px */
`;

export const Pic_exam = styled.div`
	width: 2.25rem; /* 36px */
	height: 2.25rem; /* 36px */
	flex-shrink: 0;
	display: flex;
	padding: 0;
	margin-left: 0;
`;

export const Text = styled.div`
	color: var(--Color-black50, rgba(0, 0, 0, 0.5));
	font-family: 'Pretendard Variable';
	font-size: 0.75rem; /* 12px */
	font-style: normal;
	font-weight: 300;
	line-height: 1.2; /* 120% */
	margin-top: 0.25rem; /* 4px */
`;

export const Menu = styled.div`
	position: absolute;
	top: 4.375rem; /* 70px */
	right: 1.25rem; /* 20px */
	cursor: pointer;
`;

export const ImageWrapper = styled.div`
	margin-top: 1.25rem; /* 20px */
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const Image = styled.img`
	max-width: 32rem; /* 512px */
	height: auto;
`;
