import React from "react";
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import { SocialLogin, TextWrapper, LogoImgWrapper, LogoImage } from "../style";
import naver from '../../../../assets/Login/naver.png'; 


const Naver: React.FC = () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;// 네이버 개발자 센터에서 받은 클라이언트 ID
    const redirectUri = encodeURIComponent(import.meta.env.VITE_DEV_DOMAIN ? import.meta.env.VITE_DEV_DOMAIN + '/auth/naver/callback' : 'http://localhost:3000/auth/naver/callback');
    //const state = 'random_state_string'; // CSRF 공격 방지를 위한 랜덤 문자열
    
    const handleLogin = () => {
        window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=STATE_TOKEN`;
    };

    return (
        <SocialLogin $bgColor="#00BF19" onClick={handleLogin}>
            <LogoImgWrapper $logowidth="2.4rem" $logoheight="2.4rem">
                <LogoImage src={naver} alt="Naver logo" />
            </LogoImgWrapper>
            <TextWrapper>
                <StyledText $textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                    네이버로 시작하기
                </StyledText>
            </TextWrapper>
        </SocialLogin>
    );
};

export default Naver;



