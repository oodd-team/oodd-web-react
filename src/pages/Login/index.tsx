import React from "react";
import { StyledText } from "../../components/Text/StyledText";
import theme from '../../styles/theme';
import { OODDFrame } from "../../components/Frame/Frame";
import { LogoWrapper, LoginContainer, WelcomeWrapper, Service } from "./styles";
import Naver from "./components/Naver";
import Kakao from "./components/Kakao";
import Google from "./components/Google";

const Login: React.FC = () => {
    return (
        <OODDFrame>
            <LoginContainer>
                <LogoWrapper>
                    <StyledText $textTheme={{ style: 'heading1-medium', lineHeight: 2 }}>OODD</StyledText>
                </LogoWrapper>
                <WelcomeWrapper>
                    <StyledText $textTheme={{ style: 'heading2-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                            반가워요!
                    </StyledText>
                    <StyledText $textTheme={{ style: 'heading2-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                            계정을 선택해주세요
                    </StyledText>
                </WelcomeWrapper>
                <Naver/>
                <Kakao/>
                <Google/>
                <Service>
                    <StyledText $textTheme={{ style: 'body4-regular', lineHeight: 1.2 }} color={theme.colors.gray4}>
                        서비스 약관 확인{' >'}
                    </StyledText>
                </Service>
            </LoginContainer>
        </OODDFrame>
    );
}

export default Login;




