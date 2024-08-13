import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledText } from "../../components/Text/StyledText";
import theme from '../../styles/theme';
import { SignUpContainer, LogoWrapper, IntroWrapper, NickNameContainer, NickName, Tap, NextButton } from "./style"; 
import { useRecoilState } from 'recoil';
import { nicknameState } from '../../recoil/atoms';
import { OODDFrame } from "../../components/Frame/Frame";

// 소셜 로그인 시도 후 회원 정보가 없을 때 보여질 화면


const SignUp: React.FC = () => {
    const [nickname, setNickname] = useRecoilState(nicknameState);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleNextClick = () => {
        navigate('/');
    };

    return (
        <OODDFrame>
            <SignUpContainer>
                <LogoWrapper>
                    <StyledText $textTheme={{ style: 'heading1-medium', lineHeight: 2 }}>OODD</StyledText>
                </LogoWrapper>
                <IntroWrapper>
                    <StyledText $textTheme={{ style: 'heading2-light', lineHeight: 1.5 }}>
                        이름 대신 사용할
                    </StyledText>
                    <StyledText $textTheme={{ style: 'heading2-light', lineHeight: 1.5 }}>
                        닉네임을 작성해주세요
                    </StyledText>
                </IntroWrapper>
                <NickNameContainer>
                    <NickName
                        type="text"
                        value={nickname}
                        onChange={handleChange}
                        placeholder="차분한 거북이"
                    />
                    {nickname === "" && <Tap>
                        <StyledText $textTheme={{ style: 'button2-light', lineHeight: 1.5 }}>
                            탭하여 닉네임을 수정하세요
                        </StyledText>
                    </Tap>}
                </NickNameContainer>
                <NextButton onClick={handleNextClick}>
                    <StyledText $textTheme={{ style: 'button1-medium', lineHeight: 1.5 }} color={theme.colors.white}>
                        다음
                    </StyledText>
                </NextButton>
            </SignUpContainer>
        </OODDFrame>
    )
}

export default SignUp;

