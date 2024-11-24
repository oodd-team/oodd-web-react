import React from 'react';

import { OODDFrame } from '../../components/Frame/Frame';
import Naver from './components/Naver';
import Kakao from './components/Kakao';

import { LoginContainer, WelcomeWrapper } from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';

const Login: React.FC = () => {
	const welcomeMessages = ['반가워요!', '계정을 선택해주세요']; // 텍스트를 배열로 저장

	return (
		<OODDFrame>
			<LoginContainer>
				<WelcomeWrapper>
					{welcomeMessages.map((message, index) => (
						<StyledText key={index} $textTheme={{ style: 'title2-bold' }} color={theme.colors.black}>
							{message}
						</StyledText>
					))}
				</WelcomeWrapper>
				<Kakao />
				<Naver />
			</LoginContainer>
		</OODDFrame>
	);
};

export default Login;
