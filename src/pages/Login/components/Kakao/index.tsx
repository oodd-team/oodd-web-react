import React from 'react';

import theme from '../../../../styles/theme';
import { SocialLogin, LogoImgWrapper, LogoImage, TextWrapper } from '../style';
import { StyledText } from '../../../../components/Text/StyledText';

import kakao from '../../../../assets/default/snsIcon/kakao.svg';

const Kakao: React.FC = () => {
	const SERVER_URI = import.meta.env.VITE_NEW_API_URL;

	const handleLogin = () => {
		// 리다이렉트 URL 설정
		const redirectUrl = encodeURIComponent(`${import.meta.env.VITE_DOMAIN || window.location.origin}/login/complete`);

		// 서버 URL 생성
		const serverUrl = `${SERVER_URI}/auth/login/kakao?redirectUrl=${redirectUrl}`;

		// 서버로 리다이렉션
		window.open(serverUrl, '_self');
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
