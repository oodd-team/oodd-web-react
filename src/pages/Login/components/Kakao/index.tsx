import React from "react";
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import kakao from '../../../../assets/Login/kakao.png'; 
import { SocialLogin,LogoImgWrapper,LogoImage, TextWrapper} from "../style";

const Kakao:React.FC = () => {
    return (
        <SocialLogin $bgColor="#FFE716">
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