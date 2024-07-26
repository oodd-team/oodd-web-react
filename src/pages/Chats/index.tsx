import { useState } from 'react';
import { StyledText } from '../../components/Text/StyledText';
import { Header, TabbarLayout, TabBox, RecentChat } from './styles';
import theme from '../../styles/theme';

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
		<div
			style={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '512px' }}
		>
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
				</>
			)}
		</div>
	);
};

export default Chats;
