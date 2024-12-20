import { OODDFrame } from '../../components/Frame/Frame';
import { Header } from './styles';
import theme from '../../styles/theme';
import NavBar from '../../components/NavBar';
import TabBar from './TabBar';

const Chats: React.FC = () => {
	return (
		<OODDFrame>
			<Header $textTheme={{ style: 'title1-bold' }} color={theme.colors.black}>
				Chats
			</Header>
			<TabBar></TabBar>
			<NavBar />
		</OODDFrame>
	);
};

export default Chats;
