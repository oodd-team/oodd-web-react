import styled from 'styled-components';

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	margin-left: 10px;
	position: fixed; /* 화면 상단에 고정 */
	top: 0; /* 상단에 위치 */
	left: 0; /* 왼쪽에 위치 */
	width: 100%; /* 화면의 전체 너비 차지 */
	background-color: white; /* 배경색 설정 (필요에 따라 변경) */
	z-index: 1000; /* 다른 요소들보다 위에 오도록 설정 */
`;

export const IconContainer = styled.div`
	display: flex;
	align-items: center;
	margin-right: 18px;

	a {
		display: flex;
		align-items: center;
	}

	img {
		width: 1.5rem; /* 24px */
		height: 1.5rem; /* 24px */
	}
`;
