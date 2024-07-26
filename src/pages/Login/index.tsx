import React from "react";
import { StyledText } from "../../components/Text/StyledText";
import theme from '../../styles/theme';
import styled, { createGlobalStyle } from "styled-components";
import kakao from '../../assets/kakao.png';
import naver from '../../assets/naver.png'; 
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';

const GlobalStyle = createGlobalStyle`
    body, html {
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
`;

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

export const LoginContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 844px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
`;

export const LogoWrapper = styled.div`
    display: flex;
    width: 116px;
    height: 32px;
    position: absolute;
    top: 195px;
    left: calc(50% - 58px);
`;

export const WelcomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 188px;
    height: 64px;
    line-height: 130%;
    font-style: normal;
    font-weight: 300;
    font-size: 21px;
    text-align: center;
    color: #000000;
    white-space: nowrap;
    position: absolute;
    top: 250px;
`;

export const SocialLogin = styled.button<{ $bgColor: string; $border?: boolean; $top: string}>`
    display: flex;
    align-items: center;
    width: 342px;
    height: 56px;
    background-color: ${({ $bgColor }) => $bgColor};
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    border-radius: 3px;
    border: ${({ $border }) => $border ? '1px solid #000' : 'none'};
    cursor: pointer;
    position: absolute;
    top: ${({ $top }) => $top};
    padding: 0 20px;
    box-sizing: border-box;
`;

export const LogoWrapperButton = styled.div<{ $logowidth: string; $logoheight: string; $left: string }>`
    display: flex;
    align-items: center;
    position: absolute;
    left: ${({ $left }) => $left};
    width: ${({ $logowidth }) => $logowidth};
    height: ${({ $logoheight }) => $logoheight};
`;

export const LogoImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const TextWrapper = styled.div`
    width: 100%;
    text-align: center;
    font-size: 14px;
`;

export const Service = styled.button`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 13px;
    font-style: normal;
    font-weight: bold;
    stroke-width: 1px;
    stroke: #000;
    border-bottom: 1.5px solid #000; /* 밑줄 색상 및 두께 */
    padding-bottom: 0; /* 텍스트와 밑줄 사이의 간격 조절 */
    line-height: 120%; /* 15.6px */
    position: absolute;
    top: 634px;
`;

const Login: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <PageWrapper>
                <LoginContainer>
                    <LogoWrapper>
                        <StyledText textTheme={{ style: 'heading1-bold', lineHeight: 2 }}>OODD</StyledText>
                    </LogoWrapper>
                    <WelcomeWrapper>
                        <StyledText textTheme={{ style: 'heading2-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                            반가워요!
                        </StyledText>
                        <StyledText textTheme={{ style: 'heading2-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                            계정을 선택해주세요
                        </StyledText>
                    </WelcomeWrapper>
                    <SocialLogin $bgColor="#00BF19" $top="350px">
                        <LogoWrapperButton $logowidth="45px" $logoheight="45px" $left="23px">
                            <LogoImage src={naver} alt="Naver logo" />
                        </LogoWrapperButton>
                        <TextWrapper>
                            <StyledText textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                                네이버로 시작하기
                            </StyledText>
                        </TextWrapper>
                    </SocialLogin>
                    <SocialLogin $bgColor="#FFE716" $top="418px">
                        <LogoWrapperButton $logowidth="35px" $logoheight="35px" $left="28px">
                            <LogoImage src={kakao} alt="Kakao logo" />
                        </LogoWrapperButton>
                        <TextWrapper>
                            <StyledText textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                                카카오로 시작하기
                            </StyledText>
                        </TextWrapper>
                    </SocialLogin>
                    <SocialLogin $bgColor="#ffffff" $border $top="486px">
                        <LogoWrapperButton $logowidth="68px" $logoheight="38.25px" $left="10px">
                            <LogoImage src={google} alt="Google logo" />
                        </LogoWrapperButton>
                        <TextWrapper>
                            <StyledText textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                                구글로 시작하기
                            </StyledText>
                        </TextWrapper>
                    </SocialLogin>
                    <SocialLogin $bgColor="#ffffff" $border $top="554px">
                        <LogoWrapperButton $logowidth="28.333px" $logoheight="28.333px" $left="30px">
                            <LogoImage src={facebook} alt="Facebook logo" />
                        </LogoWrapperButton>
                        <TextWrapper>
                            <StyledText textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                                페이스북으로 시작하기
                            </StyledText>
                        </TextWrapper>
                    </SocialLogin>
                    <Service>
                        서비스 약관 확인{'>'}
                    </Service>
                </LoginContainer>
            </PageWrapper>
        </>
    );
}

export default Login;




