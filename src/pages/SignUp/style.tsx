import styled from 'styled-components';
import { StyledText } from '@components/Text/StyledText';

export const SignUpLayout = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

export const LogoWrapper = styled.figure`
	display: flex;
	align-items: center;
	width: 100%;

	/* 초기 max-width를 설정하고, 화면 너비가 375px 이상부터 768px 사이에서는 점진적으로 증가하도록 함 */
	max-width: clamp(7.5rem, 26vw, 12.5rem);

	/* 기본 마진 값 설정 */
	margin: 150px 0 1.875rem 0;

	/* 화면 높이가 811px에서 1079px까지 점진적으로 증가하도록 설정 */
	@media (min-height: 50.6875rem) and (max-height: 67.4375rem) {
		margin: calc(9.375rem + (100vh - 50.6875rem) * 0.5) 0 1.875rem 0; /* 점진적으로 증가하는 마진 */
	}

	/* 높이가 1080px 이상일 때 마진 고정 */
	@media (min-height: 67.5rem) {
		margin: 17.0625rem 0 1.875rem 0; /* 1080px 이상일 때 고정 */
	}
`;

export const LogoImg = styled.img`
	width: 100%;
`;

export const SignupStepContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 21.875rem;
	width: 100%;
	height: 4rem; /* 64px / 16 */
	text-align: center;
`;

export const InputContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 3.25rem;
	margin: 5rem auto 0; /* 중앙 정렬을 위한 auto */
`;

export const InputValue = styled.input`
	width: 100%;
	max-width: 300px;
	height: 3.25rem;
	font-family: Pretendard;
	font-size: 2.5rem;
	font-weight: 500;
	line-height: 130%;
	border: none;
	outline: none;
	text-align: center;
	background-color: transparent;
	margin: 0 auto; /* 중앙 정렬 */
`;

export const TapToEdit = styled(StyledText)`
	width: 100%;
	height: 1.3125rem;
	margin: 1.25rem auto 0; /* 중앙 정렬을 위한 auto */
`;
