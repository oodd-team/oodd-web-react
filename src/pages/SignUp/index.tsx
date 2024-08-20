import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import { StyledText } from "../../components/Text/StyledText";
import theme from '../../styles/theme';
import { SignUpContainer, LogoWrapper, IntroWrapper, NickNameContainer, NickName, Tap, NextButton, LogoImg } from "./style"; 
import { OODDFrame } from "../../components/Frame/Frame";
import OODDlogo from '../../../src/assets/OODDlogo.svg'
import request from "../../apis/core";
import { SignUpDto } from "./SignUpDto";

// 소셜 로그인 시도 후 회원 정보가 없을 때 보여질 화면

const SignUp: React.FC = () => {
    const [nickname, setNickname] = useState<string>('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');
    const Token = localStorage.getItem('jwt_token');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    }; // 사용자의 닉네임 저장

    const handleNextClick = () => {

        if (userId && Token) {
            request.patch<SignUpDto>(`/users/${userId}}`, {
                nickname: nickname
            })
            .then(response => {
                console.log('사용자 정보 업데이트 성공:', response);
                navigate('/');
            })
            .catch(error => {
                console.error('사용자 정보 업데이트 실패:', error);
                alert('다른 닉네임을 입력해주세요!');
                navigate('/signup');
            });
        } else {
            console.error('유효하지 않은 사용자 ID 또는 토큰');
        }
    };

    return (
        <OODDFrame>
            <SignUpContainer>
                <LogoWrapper>
                    <LogoImg src={OODDlogo} />
                </LogoWrapper>
                <IntroWrapper>
                    <StyledText $textTheme={{ style: 'heading2-light', lineHeight: 2 }}>
                        이름 대신 사용할
                    </StyledText>
                    <StyledText $textTheme={{ style: 'heading2-light', lineHeight: 2 }}>
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
    );
};

export default SignUp;

