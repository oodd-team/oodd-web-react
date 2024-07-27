import { useState } from 'react';
import { StyledText } from '../../components/Text/StyledText';
import { OODDFrame } from '../../components/Frame/Frame';
import { Header, TabbarLayout, TabBox, RecentChat } from './styles';
import theme from '../../styles/theme';
import ChatList from './ChatList/index';
import NavBar from '../../components/NavBar';

interface RecentChats {
	id: number;
	isWaiting: boolean;
}

const mockChats: RecentChats[] = [
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

const Chats: React.FC = () => {
	const [viewChat, setViewChat] = useState<boolean>(true);
	// true: 최근 채팅방 탭
	// false: 요청 탭

	const onClickRequests = (): void => {
		setViewChat(false);
	};

	const onClickRecentChats = (): void => {
		setViewChat(true);
	};

	return (
		<OODDFrame>
			<Header>
				<StyledText textTheme={{ style: 'heading1-medium', lineHeight: 2 }} color={theme.colors.black}>
					Chats
				</StyledText>
			</Header>
			<TabbarLayout>
				<TabBox $isActive={!viewChat} onClick={onClickRequests}>
					<StyledText
						textTheme={{ style: `${viewChat ? 'body2-light' : 'body2-medium'}`, lineHeight: 1.5 }}
						color={`${viewChat ? theme.colors.gray3 : theme.colors.black}`}
					>
						요청
					</StyledText>
				</TabBox>
				<TabBox $isActive={viewChat} onClick={onClickRecentChats}>
					<StyledText
						textTheme={{ style: `${viewChat ? 'body2-medium' : 'body2-light'}`, lineHeight: 1.5 }}
						color={`${viewChat ? theme.colors.black : theme.colors.gray3}`}
					>
						최근 채팅
					</StyledText>
				</TabBox>
			</TabbarLayout>
			{viewChat && (
				<>
					<RecentChat>
						<StyledText textTheme={{ style: 'body4-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
							최근 채팅방
						</StyledText>
					</RecentChat>
					{mockChats.map((chat) => {
						return <ChatList key={chat.id} isWaiting={chat.isWaiting} />;
					})}
				</>
			)}
			<NavBar />
		</OODDFrame>
	);
};

export default Chats;
