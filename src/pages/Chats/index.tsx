import theme from '@styles/theme';

import { OODDFrame } from '@components/Frame/Frame';
import NavBar from '@components/NavBar';

import TabBar from './TabBar/index';

import { Header } from './styles';

const Chats: React.FC = () => {
	return (
		<OODDFrame>
			<Header $textTheme={{ style: 'title1-bold' }} color={theme.colors.text.primary}>
				Chats
			</Header>
			<TabBar></TabBar>
			<NavBar />
		</OODDFrame>
	);
};

export default Chats;
