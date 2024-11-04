import styled from 'styled-components';

export const UserInfoContainer = styled.main`
	display: flex;
	width: 100%;
	flex-direction: column; // 전체적으로 감싸는 요소들이 세로로 정렬
	padding: 0.5rem 0 1rem 0;
	border-bottom: 1px rgba(0, 0, 0, 0.09) solid;
`;

export const ButtonContainer = styled.section`
	display: flex;
	gap: 2.1875rem; // 35px
	margin-top: 1rem;
	justify-content: center;
`;

export const LongButton = styled.button`
	display: flex;
	justify-content: center;
	width: 100%;
	gap: 0.5rem; // 8px
	height: 3.1875rem; // 44px
	background: var(--Linear1, linear-gradient(93deg, #ff2389 1.22%, #f27575 99.73%));
	border-radius: 0.3125rem; // 5px
	align-items: center;
`;
