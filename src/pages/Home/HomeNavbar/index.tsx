import React from 'react';
import { HomeLogo, HomeNavbarLayout, NotiIcon } from './styles';
import noti from './../../../assets/Home/noti.svg';

const HomeNavbar: React.FC = () => {
	return (
		<HomeNavbarLayout>
			<HomeLogo />
			<NotiIcon src={noti} />
		</HomeNavbarLayout>
	);
};

export default HomeNavbar;
