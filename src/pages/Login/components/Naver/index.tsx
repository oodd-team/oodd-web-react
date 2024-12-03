import React from 'react';

import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { SocialLogin, TextWrapper, LogoImgWrapper, LogoImage } from '../style';

import naver from '../../../../assets/default/snsIcon/naver.svg';

const Naver: React.FC = () => {
	console.log(import.meta.env.VITE_DOMAIN);
	const clientId = import.meta.env.VITE_NAVER_CLIENT_ID; // 네이버 개발자 센터에서 받은 클라이언트 ID
	const redirectUri = encodeURIComponent(
		import.meta.env.VITE_DOMAIN
			? import.meta.env.VITE_DOMAIN + '/auth/naver/callback'
			: 'http://localhost:3000/auth/naver/callback',
	);

	const handleLogin = () => {
		window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=STATE_TOKEN`;
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
