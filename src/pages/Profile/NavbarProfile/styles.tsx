import styled from 'styled-components';

export const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 20px;
	position: fixed; 
	top: 0;
	left: 0; 
	width: 100%; 
	background-color: white;
	z-index: 1000; /* 다른 요소들보다 위에 오도록 설정 */

	position: sticky;
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
