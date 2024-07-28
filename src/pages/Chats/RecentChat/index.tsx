import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { RecentChatInfo } from './styles';
import ChatList from '../ChatList/index';

interface RecentChatList {
	id: number;
	isWaiting: boolean;
}

const RecentChatLists: RecentChatList[] = [
	{
		id: 0,
		isWaiting: false,
	},
	{
		id: 1,
		isWaiting: false,
	},
	{
		id: 2,
		isWaiting: true,
	},
	{
		id: 3,
		isWaiting: false,
	},
];
const RecentChat: React.FC = () => {
	return (
		<>
			<RecentChatInfo>
				<StyledText $textTheme={{ style: 'body4-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
					최근 채팅방
				</StyledText>
			</RecentChatInfo>
			{RecentChatLists.map((chat) => {
				return <ChatList key={chat.id} isWaiting={chat.isWaiting} />;
			})}
		</>
	);
};

export default RecentChat;
