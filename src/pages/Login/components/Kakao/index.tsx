import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import kakao from '../../../../assets/Login/Kakao.svg';
import { SocialLogin, LogoImgWrapper, LogoImage, TextWrapper } from '../style';

const Kakao: React.FC = () => {
	// 환경 변수에서 값을 읽어옴
	const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
	const REDIRECT_URI = encodeURIComponent(
		import.meta.env.VITE_DEV_DOMAIN
			? import.meta.env.VITE_DEV_DOMAIN + '/auth/kakao/callback'
			: 'http://localhost:3000/auth/kakao/callback',
	);

	const handleLogin = () => {
		window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
	};

	return (
		<SocialLogin $bgColor="#FEE500" onClick={handleLogin}>
			<LogoImgWrapper>
				<LogoImage src={kakao} alt="Kakao logo" />
			</LogoImgWrapper>
			<TextWrapper>
				<StyledText $textTheme={{ style: 'body2-bold' }} color={theme.colors.black}>
					Kakao로 계속하기
				</StyledText>
			</TextWrapper>
		</SocialLogin>
	);
};

export default Kakao;
