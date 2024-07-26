import React from 'react';
import { OODDFrame } from '../../components/Frame/Frame';
import HomeTabBar from './HomeTabBar';
import HomeTopBar from './HomeTopBar';
import NavBar from '../../components/NavBar';
import { HomeContainer } from './styles';

// Home 페이지입니다.
const Home: React.FC = () => {
	return (
		<OODDFrame>
			<HomeContainer>
				<HomeTopBar />
				<HomeTabBar />
			</HomeContainer>
			<NavBar />
		</OODDFrame>
	);
};

export default Home;
