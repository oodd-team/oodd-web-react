import React from "react";
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import google from '../../../../assets/Login/google.png'; 
import { SocialLogin,LogoImgWrapper,LogoImage, TextWrapper} from "../style";

const Google:React.FC = () => {
    return (
        <SocialLogin $bgColor="#ffffff" $border >
            <LogoImgWrapper $logowidth="2.2rem" $logoheight="2.2rem">
                <LogoImage src={google} alt="Google logo" />
            </LogoImgWrapper>
            <TextWrapper $left="1.5rem">
                <StyledText $textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                    구글로 시작하기
                </StyledText>
            </TextWrapper>
        </SocialLogin>
    )
}

export default Google;