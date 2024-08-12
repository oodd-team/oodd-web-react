import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { RecentChatInfo } from './styles';
import { MockUserIdAtom } from '../../../recoil/MockUserId';
import { useEffect, useState } from 'react';
import request from '../../../apis/core';
import { ChatRoomDto, ChatRoomListDto } from './dto';
import ChatRoomList from '../ChatRoomList';
import { useRecoilValue } from 'recoil';
import { AllMesagesAtom } from '../../../recoil/AllMessages';

const RecentChat: React.FC = () => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomDto[]>();
	const userId = useRecoilValue(MockUserIdAtom);
	const allMessages = useRecoilValue(AllMesagesAtom);

	useEffect(() => {
		const getChatRoomList = async () => {
			try {
				const response = await request.get<ChatRoomListDto>(`/chat-room/${userId}`);

				if (response.isSuccess) {
					setChatRoomList(response.result);
				} else {
					console.error(response.message);
				}
			} catch (error) {
				console.error(error);
			}
		};

		getChatRoomList();
	}, [allMessages]);

	return (
		<>
			<RecentChatInfo>
				<StyledText $textTheme={{ style: 'body4-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
					최근 채팅방
				</StyledText>
			</RecentChatInfo>
			{chatRoomList
				? chatRoomList.map((room) => {
						return <ChatRoomList key={room.id} {...room} />;
					})
				: null}
		</>
	);
};

export default RecentChat;
