import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { RecentChatInfo } from './styles';
import ChatList from '../ChatList/index';
import { MockUserId } from '../../../recoil/MockUserId';
import { useEffect, useState } from 'react';
import request from '../../../apis/core';
import { ChatRoomDto, GetChatRoomListDto } from './dto';

const RecentChat: React.FC = () => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomDto[]>();

	useEffect(() => {
		const getChatRoomList = async () => {
			try {
				const response = await request<GetChatRoomListDto>(`/chat-room/${MockUserId}`);

				if (response.data.isSuccess) {
					setChatRoomList(response.data.result);
				} else {
					console.error(response.data.message);
				}
			} catch (error) {
				console.error(error);
			}
		};

		getChatRoomList();
	}, []);

	return (
		<>
			<RecentChatInfo>
				<StyledText $textTheme={{ style: 'body4-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
					최근 채팅방
				</StyledText>
			</RecentChatInfo>
			{chatRoomList
				? chatRoomList.map((room) => {
						return <ChatList key={room.id} {...room} />;
					})
				: null}
		</>
	);
};

export default RecentChat;
