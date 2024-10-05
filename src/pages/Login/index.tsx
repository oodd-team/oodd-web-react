import React from 'react';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { LoginContainer, WelcomeWrapper, Service } from './styles';
import Naver from './components/Naver';
import Kakao from './components/Kakao';

const Login: React.FC = () => {
	return (
		<OODDFrame>
			<LoginContainer>
				<WelcomeWrapper>
					<StyledText $textTheme={{ style: 'title2-bold' }} color={theme.colors.black}>
						반가워요!
					</StyledText>
					<StyledText $textTheme={{ style: 'title2-bold' }} color={theme.colors.black}>
						계정을 선택해주세요
					</StyledText>
				</WelcomeWrapper>
				<Kakao />
				<Naver />
				<Service>
					<StyledText $textTheme={{ style: 'body2-medium' }} color={theme.colors.gray3}>
						서비스 약관 확인{' >'}
					</StyledText>
				</Service>
			</LoginContainer>
		</OODDFrame>
	);
};

export default Login;
