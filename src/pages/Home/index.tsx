import React from 'react';
import HomeNavbar from './HomeNavbar';
import HomeTabbar from './HomeTabbar';
import Bottombar from '../../components/Bottombar';
import { OODDContainer, OODDFrame } from '../../components/Frame/Frame';

const Home: React.FC = () => {
	return (
		<OODDFrame>
			<OODDContainer>
				<HomeNavbar />
				<HomeTabbar />
			</OODDContainer>
			<Bottombar />
		</OODDFrame>
	);
};

export default Home;
