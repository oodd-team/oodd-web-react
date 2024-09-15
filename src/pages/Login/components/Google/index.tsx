import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import google from '../../../../assets/Login/google.png';
import { SocialLogin, LogoImgWrapper, LogoImage, TextWrapper } from '../style';

const Google: React.FC = () => {
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
	const redirectUri = encodeURIComponent(
		import.meta.env.VITE_DEV_DOMAIN
			? import.meta.env.VITE_DEV_DOMAIN + '/auth/google/callback'
			: 'http://localhost:3000/auth/google/callback',
	);

	const handleLogin = () => {
		window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile email`;
	};

	return (
		<SocialLogin $bgColor="#ffffff" $border onClick={handleLogin}>
			<LogoImgWrapper $logowidth="2.5rem" $logoheight="2.2rem">
				<LogoImage src={google} alt="Google logo" />
			</LogoImgWrapper>
			<TextWrapper $left="1.5rem">
				<StyledText $textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
					구글로 시작하기
				</StyledText>
			</TextWrapper>
		</SocialLogin>
	);
};

export default Google;
