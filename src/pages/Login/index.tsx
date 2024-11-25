import React from 'react';

import { OODDFrame } from '../../components/Frame/Frame';
import Naver from './components/Naver';
import Kakao from './components/Kakao';

import { LoginContainer, StyledWelcomeWrapper } from './styles';
import theme from '../../styles/theme';

const Login: React.FC = () => {
	return (
		<OODDFrame>
			<LoginContainer>
				<StyledWelcomeWrapper $textTheme={{ style: 'title2-bold' }} color={theme.colors.black}>
					{'반가워요! \n계정을 선택해주세요.'}
				</StyledWelcomeWrapper>
				<Kakao />
				<Naver />
			</LoginContainer>
		</OODDFrame>
	);
};

export default Login;
