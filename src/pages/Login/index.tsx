import React from 'react';

import { OODDFrame } from '@/components/Frame/Frame';
import theme from '@/styles/theme';

import kakaoLogo from '@/assets/default/snsIcon/kakao.svg';
import naverLogo from '@/assets/default/snsIcon/naver.svg';

import SocialLoginButton from './SocialLoginButton/index';

import { LoginContainer, StyledWelcomeWrapper } from './styles';

const Login: React.FC = () => {
	return (
		<OODDFrame>
			<LoginContainer>
				<StyledWelcomeWrapper $textTheme={{ style: 'title2-bold' }} color={theme.colors.black}>
					{'반가워요! \n계정을 선택해주세요.'}
				</StyledWelcomeWrapper>
				<SocialLoginButton
					bgColor="#FEE500"
					logoSrc={kakaoLogo}
					altText="Kakao logo"
					buttonText="Kakao로 계속하기"
					provider="kakao"
				/>
				<SocialLoginButton
					bgColor="#05B918"
					logoSrc={naverLogo}
					altText="Naver logo"
					buttonText="네이버로 계속하기"
					provider="naver"
				/>
			</LoginContainer>
		</OODDFrame>
	);
};

export default Login;
