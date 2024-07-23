import React from 'react';
import noti from './../../assets/Home/noti.svg';
import { HomeLogo, HomeTopBarContainer, NotiIcon } from './styles';

// Home 페이지의 상단 바입니다. 로고와 알림이 있습니다.
const HomeTopBar: React.FC = () => {
	return (
		<HomeTopBarContainer>
			<HomeLogo />
			<NotiIcon src={noti} />
		</HomeTopBarContainer>
	);
};

export default HomeTopBar;
