import React from "react";
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import kakao from '../../../../assets/Login/kakao.png'; 
import { SocialLogin, LogoImgWrapper, LogoImage, TextWrapper } from "../style";

const Kakao: React.FC = () => {
    // 환경 변수에서 값을 읽어옴
    const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const handleLogin = () => {
        window.location.href= `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    return (
        <SocialLogin $bgColor="#FFE716" onClick={handleLogin}>
            <LogoImgWrapper $logowidth="2.3rem" $logoheight="2.3rem">
                <LogoImage src={kakao} alt="Kakao logo" />
            </LogoImgWrapper>
            <TextWrapper>
                <StyledText $textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                    카카오로 시작하기
                </StyledText>
            </TextWrapper>
        </SocialLogin>
    );
}

export default Kakao;

