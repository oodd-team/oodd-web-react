import { StyledText } from '../../components/Text/StyledText';
import { OODDFrame } from '../../components/Frame/Frame';
import { Header } from './styles';
import theme from '../../styles/theme';
import NavBar from '../../components/NavBar';
import TabBar from './TabBar';
import RecentChat from './RecentChat';
import Request from './Request';

const Chats: React.FC = () => {
	return (
		<OODDFrame>
			<Header>
				<StyledText $textTheme={{ style: 'heading1-medium', lineHeight: 2 }} color={theme.colors.black}>
					Chats
				</StyledText>
			</Header>
			<TabBar
				tab1="요청"
				tab2="최근 채팅"
				element1={<Request />}
				element2={<RecentChat />}
				defaultViewTab1={false}
			></TabBar>
			<NavBar />
		</OODDFrame>
	);
};

export default Chats;
