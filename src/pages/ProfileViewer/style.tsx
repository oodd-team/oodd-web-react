import styled from 'styled-components';

export const ProfileViewerContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	position: relative;
	padding: 0 20px; /* 기본 패딩값 */

	// @media (min-width: 375px) {
	// 	padding: 0 calc(20px + (44 * ((100vw - 375px) / 393))); /* 375px부터 768px 사이에서 서서히 증가 */
	// }

	// @media (min-width: 768px) and (max-width: 1920px) {
	// 	padding: 0 calc(64px + (356 * ((100vw - 768px) / 1152))); /* 768px부터 1920px 사이에서 서서히 증가 */
	// }

	// @media (min-width: 1920px) {
	// 	padding: 0 420px; /* 1920px 이상에서는 420px로 고정 */
	// }
`;

export const Vector = styled.div`
	box-sizing: border-box;
	max-width: 32rem;
	width: 100%;
	height: 0;
	border: 0.0625rem solid #c4c4c4; // 1px
`;

export const CounterContainer = styled.section`
	display: flex;
	width: 100%;
	justify-content: space-around;
	align-items: center;
`;

export const Count = styled.div`
	display: flex;
	flex-direction: column; // 세로 정렬
	align-items: center;
	justify-content: center;
	gap: 0.3125rem;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
`;

export const PostListContainer = styled.section`
	display: flex;
	gap: 15px;
	flex-wrap: wrap;
	width: 100%;
	overflow-y: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;
