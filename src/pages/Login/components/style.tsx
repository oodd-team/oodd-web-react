import styled from 'styled-components';

export const SocialLogin = styled.button<{ $bgColor: string; $border?: boolean }>`
	display: flex;
	align-items: center;
	width: 20rem;
	/* 375px ~ 767px 사이에서는 점차적으로 커짐 */
	@media (min-width: 23.5rem) and (max-width: 47.875rem) {
		width: calc(100vw - 3.5rem);
	}

	/* 768px 이상에서는 버튼 너비가 40rem로 고정 */
	@media (min-width: 47.9375rem) {
		width: 40rem;
	}
	height: 3.5rem;
	background-color: ${({ $bgColor }) => $bgColor};
	border-radius: 0.5rem;
	border: ${({ $border }) => ($border ? '1px solid #000' : 'none')};
	cursor: pointer;
	margin-bottom: 0.5rem;
	box-sizing: border-box;
`;

export const LogoImgWrapper = styled.section`
	display: flex;
	align-items: center;
	width: 2.25rem;
	height: 2.25rem;
	margin-left: 1rem;
`;

export const LogoImage = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

export const TextWrapper = styled.div<{ $left?: string }>`
	display: flex;
	width: 12.5rem;
	padding-left: ${({ $left }) => $left || '1.2rem'};
	align-items: center;
	margin: 0 auto;
`;
