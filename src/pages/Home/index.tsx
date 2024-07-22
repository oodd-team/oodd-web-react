import React from 'react';
import { HomeContainer, HomeLayout } from './styles';
import HomeNavbar from './HomeNavbar';
import HomeTabbar from './HomeTabbar';

const Home: React.FC = () => {
	return (
		<HomeLayout>
			<HomeContainer>
				<HomeNavbar/>
				<HomeTabbar/>
			</HomeContainer>
		</HomeLayout>
	);
};

export default Home;
