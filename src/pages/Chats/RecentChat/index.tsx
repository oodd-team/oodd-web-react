import { ChatRoomList, NoChatRoomWrapper, RecentChatInfo } from './styles';
import React, { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import Loading from '@components/Loading';
import ChatRoomItem from '../ChatRoomItem/index';
import { StyledText } from '@components/Text/StyledText';
import { useSocket } from '@context/SocketProvider';
import type { ChatRoomData } from '@apis/chatting/dto';
import { getCurrentUserId } from '@utils/getCurrentUserId';
import theme from '@styles/theme';

interface RecentChatProps {
	matchingCount: number;
	swiperRef: React.MutableRefObject<SwiperCore | null>;
}

const RecentChat: React.FC<RecentChatProps> = () => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const socket = useSocket();
	const currentUserId = getCurrentUserId();

	useEffect(() => {
		// 채팅방 리스트 조회
		const getChatRooms = (data: ChatRoomData[]) => {
			setChatRoomList(data);
			setIsLoading(false);
		};

		if (socket) {
			socket.emit('getChatRooms', { userId: currentUserId });
			socket.on('chatRoomList', getChatRooms);
		}

		// 이벤트 리스너 정리
		// 컴포넌트가 언마운트되면 더 이상 이벤트를 수신하지 않음
		return () => {
			if (socket) {
				socket.off('getChatRooms', getChatRooms);
			}
		};
	}, [socket]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : chatRoomList.length !== 0 ? (
				<>
					<RecentChatInfo $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
						최근 채팅방
					</RecentChatInfo>
					<ChatRoomList>
						{chatRoomList.map((chatRoom) => (
							<ChatRoomItem key={chatRoom.id} {...chatRoom} />
						))}
					</ChatRoomList>
				</>
			) : (
				<NoChatRoomWrapper>
					<StyledText $textTheme={{ style: 'headline1-medium' }} color={theme.colors.text.tertiary}>
						개설된 채팅방이 없어요.
					</StyledText>
				</NoChatRoomWrapper>
			)}
		</>
	);
};

export default RecentChat;
