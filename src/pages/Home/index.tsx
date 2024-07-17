import React from 'react';
import Navbar from '../../components/Navbar';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';

const Home: React.FC = () => {
	return (
		<div>
			<Navbar />
			<h1>Home Page입니다</h1>
			<StyledText textTheme={{ style: 'heading1-bold', lineHeight: 2 }}>Heading1 Bold</StyledText>
			<StyledText textTheme={{ style: 'heading1-medium', lineHeight: 2 }} color={theme.colors.gray4}>
				Heading1 Medium
			</StyledText>
			<StyledText textTheme={{ style: 'heading2-light', lineHeight: 2 }} color={theme.colors.gray4}>
				Heading2 Light
			</StyledText>
			<StyledText textTheme={{ style: 'body3-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
				Body3 Light
			</StyledText>
			<StyledText textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.gray2}>
				Body2 Regular
			</StyledText>
			<StyledText textTheme={{ style: 'button2-medium', lineHeight: 1.5 }} color={theme.colors.gray1}>
				Button2 Medium
			</StyledText>
		</div>
	);
};

export default Home;
