import React from 'react';
import { HomeContainer, HomeLayout } from './styles';
import HomeNavbar from './HomeNavbar';
import HomeTabbar from './HomeTabbar';
import Bottombar from '../../components/Bottombar';

const Home: React.FC = () => {
	return (
		<HomeLayout>
			<HomeContainer>
				<HomeNavbar />
				<HomeTabbar />
			</HomeContainer>
			<Bottombar />
		</HomeLayout>
	);
};

export default Home;
