import React from 'react';

import theme from '@styles/theme';

import type { SocialLoginProps } from './dto';

import { SocialLoginContainer, LogoImgWrapper, LogoImage, StyledTextWrapper } from './style';

const SERVER_URI = import.meta.env.VITE_NEW_API_URL;

const SocialLoginButton: React.FC<SocialLoginProps> = ({ bgColor, logoSrc, altText, buttonText, provider }) => {
	const handleSocialLoginClick = () => {
		// 리다이렉트 URL 설정
		const redirectUrl = encodeURIComponent(`${import.meta.env.VITE_DOMAIN || window.location.origin}/login/complete`);

		// 서버 URL 생성
		const serverUrl = `${SERVER_URI}/auth/login/${provider}?redirectUrl=${redirectUrl}`;

		// 서버로 리다이렉션
		window.open(serverUrl, '_self');
	};

	return (
		<SocialLoginContainer $bgColor={bgColor} onClick={handleSocialLoginClick}>
			<LogoImgWrapper>
				<LogoImage src={logoSrc} alt={altText} />
			</LogoImgWrapper>
			<StyledTextWrapper
				$textTheme={{ style: 'body2-bold' }}
				color={provider === 'kakao' ? theme.colors.text.primary : theme.colors.text.contrast}
			>
				{buttonText}
			</StyledTextWrapper>
		</SocialLoginContainer>
	);
};

export default SocialLoginButton;
