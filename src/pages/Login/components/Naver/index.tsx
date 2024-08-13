import React from "react";
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import { SocialLogin, TextWrapper, LogoImgWrapper, LogoImage } from "../style";
import naver from '../../../../assets/Login/naver.png'; 

const Naver: React.FC = () => {
    return (
        <SocialLogin $bgColor="#00BF19">
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


