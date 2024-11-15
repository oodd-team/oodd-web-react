import { ChatRoomList, NoChatRoomWrapper, RecentChatInfo } from './styles';
import React, { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import Loading from '../../../components/Loading';
import ChatRoomItem from '../ChatRoomItem';
import { StyledText } from '../../../components/Text/StyledText';
import { useSocket } from '../../../context/SocketProvider';
import { ChatRoomData } from '../../../apis/chatting/dto';

interface RecentChatProps {
	matchingRequests: number;
	swiperRef: React.MutableRefObject<SwiperCore | null>;
}

const RecentChat: React.FC<RecentChatProps> = () => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomData[]>();
	const [isLoading, setIsLoading] = useState(true);
	const socket = useSocket();

	useEffect(() => {
		// 채팅방 리스트 조회
		const getChatRooms = (data: ChatRoomData[]) => {
			setChatRoomList(data);
			setIsLoading((prev) => !prev);
		};

		if (socket) {
			socket.on('getChatRooms', getChatRooms);
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
			) : chatRoomList ? (
				<>
					<RecentChatInfo $textTheme={{ style: 'body2-regular' }} color="#1d1d1d">
						최근 채팅방
					</RecentChatInfo>
					<ChatRoomList>
						{chatRoomList.map((room) => (
							<ChatRoomItem key={room.chatRoomId} {...room} />
						))}
					</ChatRoomList>
				</>
			) : (
				<NoChatRoomWrapper>
					<StyledText $textTheme={{ style: 'headline1-bold' }} color="#8e8e93">
						개설된 채팅방이 없어요
					</StyledText>
				</NoChatRoomWrapper>
			)}
		</>
	);
};

export default RecentChat;
