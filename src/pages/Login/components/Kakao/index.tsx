import React from "react";
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import kakao from '../../../../assets/Login/kakao.png'; 
import { SocialLogin,LogoImgWrapper,LogoImage, TextWrapper} from "../style";

const RestAPI = process.env.REACT_APP_REST_API_KEY;
const Redirect_URI = process.env.REACT_APP_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${RestAPI}&redirect_uri=${Redirect_URI}&response_type=code`
const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
};

const Kakao:React.FC = () => {
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
    )
}

export default Kakao;