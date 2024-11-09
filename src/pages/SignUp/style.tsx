import styled from 'styled-components';
import { StyledText } from '../../components/Text/StyledText';

export const SignUpContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

export const LogoWrapper = styled.figure`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 9.375rem;
	margin: 10.8rem 0 1.875rem 0; /* 195px */
`;
export const LogoImg = styled.img`
	display: flex;
	width: 100%;
`;

export const IntroWrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 13rem;
	width: 100%;
	height: 4rem; /* 64px / 16 */
	text-align: center;
`;

export const NickNameContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 12.125rem; /* 194px */
	height: 2.625rem;
	margin: 5rem auto 0; /* 중앙 정렬을 위한 auto */
`;

export const NickName = styled.input`
	width: 100%;
	max-width: 12.25rem;
	height: 2.625rem;
	font-family: Pretendard;
	font-size: 2.5rem;
	font-weight: 500;
	line-height: 130%;
	border: none;
	outline: none;
	text-align: center;
	background-color: transparent;
	text-align: center;
	margin: 0 auto; /* 중앙 정렬 */

	@media (max-width: 13.3125rem) {
		font-size: 1.5625rem;
	}
	@media (max-width: 10.3125rem) {
		font-size: 1.25rem;
	}
`;

export const TapStyled = styled(StyledText)`
	display: flex;
	justify-content: center; /* 수평 중앙 정렬 */
	width: 100%;
	max-width: 9.5625rem;
	height: 1.3125rem;
	font-size: 0.875rem;
	line-height: 1.3125rem;
	margin: 1.25rem auto 0; /* 중앙 정렬을 위한 auto */
`;
