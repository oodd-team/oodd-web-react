import styled from 'styled-components';

export const LoginContainer = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	margin: 0 auto; /* 중앙 정렬 */
	//box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1); /* 경계 구분용*/
`;

export const WelcomeWrapper = styled.section`
	display: flex;
	flex-direction: column;
	max-width: 14rem;
	width: 100%;
	height: 5rem;
	text-align: center;
	margin-bottom: 1.5rem;
`;
