import React from "react";
import { StyledText } from "../../components/Text/StyledText";
import theme from '../../styles/theme';
import styled, { createGlobalStyle } from "styled-components";
import { useState } from "react";

// 소셜 로그인 시도 후 회원 정보가 없을 때 보여질 화면

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

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 32px;
    position: absolute;
    top: 195px;
    left: calc(50% - 58px);
`;

export const IntroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 206px;
    height: 64px;
    font-style: normal;
    font-weight: 300;
    font-size: 21px;
    line-height: 120%;
    text-align: center;
    color: #000000;
    white-space: nowrap;
    position: absolute;
    top: 250px;
`;

export const NickNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 194px;
    height: 42px;
    position: absolute;
    top: 427px;
`;

export const NickName = styled.input`
    display: flex;
    width: 196px;
    height: 42px;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 550;
    font-size: 32px;
    line-height: 130%;
    color: black;
    border: none;
    outline: none;
    background-color: transparent;
    text-align: center;
`;

export const Tap = styled.div`
    display: flex;
    justify-content: center;
    width: 153px;
    height: 21px;
    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: #000000;
    margin-top: 5px;
`;
export const NextButton = styled.a`
    width: 342px;
    height: 64px;
    font-family: 'Pretendard Variable';
    position: absolute;
    top: 756px;
    color: white;
    background-color: black; 
    border-radius: 10px;
    display: flex;  // 버튼 내부의 텍스트를 중앙에 정렬하기 위해 추가
    justify-content: center;
    align-items: center;
    text-decoration: none;  // 링크의 밑줄 제거
`;

const SignUp: React.FC = () => {
    const [nickname, setNickname] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value); // 매개변수 e의 타입, React.ChangeEvent<HTMLInputElement>. 입력 필드에서 발생하는 이벤트를 처리
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("닉네임 제출:", nickname);
    };

    return (
        <>
            <GlobalStyle />
            <PageWrapper>
                <SignUpContainer>
                    <LogoWrapper>
                        <StyledText textTheme={{ style: 'heading1-bold', lineHeight: 2 }}>OODD</StyledText>
                    </LogoWrapper>
                    <IntroWrapper>
                        <StyledText textTheme={{ style: 'heading2-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                            이름 대신 사용할
                        </StyledText>
                        <StyledText textTheme={{ style: 'heading2-light', lineHeight: 1.5 }} color={theme.colors.gray4}>
                            닉네임을 작성해주세요
                        </StyledText>
                    </IntroWrapper>
                    <NickNameWrapper>
                        <form onSubmit={handleSubmit}>
                            <NickName
                                type="text"
                                value={nickname}
                                onChange={handleChange}
                                placeholder="차분한 거북이"
                            />
                        </form>
                        {nickname === "" && <Tap>탭하여 닉네임을 수정하세요</Tap>}  {/* 조건부 렌더링 */}
                    </NickNameWrapper>
                    <NextButton href="/">다음</NextButton>
                </SignUpContainer>
            </PageWrapper>
        </>
    )
}

export default SignUp;

