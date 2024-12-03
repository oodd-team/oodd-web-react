import React from 'react';

import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { SocialLogin, TextWrapper, LogoImgWrapper, LogoImage } from '../style';

import naver from '../../../../assets/default/snsIcon/naver.svg';

const Naver: React.FC = () => {
	const SERVER_URI = import.meta.env.VITE_NEW_API_URL;

	const handleLogin = () => {
		// 리다이렉트 URL 설정 및 서버 URL 생성
		const redirectUrl = 'http://localhost:3000/login/complete';
		const serverUrl = `${SERVER_URI}/auth/login/naver?redirectUrl=${redirectUrl}`;

		// 서버로 리다이렉션
		window.open(serverUrl, '_self');
	};

	return (
		<SocialLogin $bgColor="#05B918" onClick={handleLogin}>
			<LogoImgWrapper>
				<LogoImage src={naver} alt="Naver logo" />
			</LogoImgWrapper>
			<TextWrapper>
				<StyledText $textTheme={{ style: 'body2-bold' }} color={theme.colors.white}>
					네이버로 계속하기
				</StyledText>
			</TextWrapper>
		</SocialLogin>
	);
};

export default Naver;
