import styled from 'styled-components';

export const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 32rem; /* 최대 너비 512px */
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

export const Service = styled.button`
	display: flex;
	border: none;
	width: 100%;
	justify-content: center;
	padding: 20px;
	margin-top: 6.875rem;
`;
