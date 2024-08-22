import React from 'react';
import { HomeLogo, HomeTopBarContainer } from './styles';
import logo from './../../assets/logo.svg';

// Home 페이지의 상단 바입니다. 로고와 알림이 있습니다.
const HomeTopBar: React.FC = () => {
	return (
		<HomeTopBarContainer>
			<HomeLogo src={logo} alt="logo" />
		</HomeTopBarContainer>
	);
};

export default HomeTopBar;
