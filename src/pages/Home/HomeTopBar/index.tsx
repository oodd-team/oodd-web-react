import React from 'react';
import { Button, ButtonContainer, HomeLogo, HomeTopBarContainer } from './styles';
import logo from './../../assets/default/oodd.svg';
import alarm from '../../assets/default/alarm.svg';

// Home 페이지의 상단 바입니다. 로고와 알림이 있습니다.
// TODO: 버튼 클릭 이벤트 처리 필요
const HomeTopBar: React.FC = () => {
	return (
		<HomeTopBarContainer>
			<HomeLogo src={logo} alt="oodd" />
			<ButtonContainer>
				<Button>
					<img src={alarm} alt="알림" />
				</Button>
			</ButtonContainer>
		</HomeTopBarContainer>
	);
};

export default HomeTopBar;
