import React from 'react';
import Navbar from '../../components/Navbar';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { HomeContainer, HomeLayout } from './styles';
import HomeNavbar from './HomeNavbar';

const Home: React.FC = () => {
	return (
		<HomeLayout>
			<HomeContainer>
				<HomeNavbar/>
			</HomeContainer>
		</HomeLayout>
	);
};

export default Home;
