import React from 'react';
import Navbar from '../../components/Navbar';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';

const Home: React.FC = () => {
	return (
		<div>
			<Navbar />
			<h1>Home Page입니다</h1>
		</div>
	);
};

export default Home;
