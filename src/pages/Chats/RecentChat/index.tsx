import { useEffect, useState } from 'react';

import theme from '@styles/theme';

import { LatestMatchingData } from '@apis/matching/dto';
import { useSocket } from '@context/SocketProvider';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import Loading from '@components/Loading';

import type { ChatRoomData } from '@apis/chatting/dto';

import ChatRoomItem from './ChatRoomItem/index';
import MatchingRoomItem from './MatchingRoomItem/index';

import { ChatRoomList, RecentChatInfo } from './styles';

const RecentChat: React.FC = () => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomData[]>([]);
	const [latestMatching, setLatestMatching] = useState<LatestMatchingData | null>();
	const [isLoading, setIsLoading] = useState(true);
	const currentUserId = getCurrentUserId();

	const socket = useSocket();
	const matchingSocket = useSocket('matching');

	useEffect(() => {
		// 채팅방 리스트 조회
		const getChatRooms = (data: ChatRoomData[]) => {
			setChatRoomList(data);
			setIsLoading(false);
		};

		// 최근 매칭 조회
		const getLatestMatching = (data: LatestMatchingData) => {
			setLatestMatching(data);
		};

		const matchingNotFound = (data: { joinedAt: Date }) => {
			setLatestMatching({
				createdAt: data.joinedAt,
			});
		};

		if (socket) {
			socket.emit('getChatRooms', { userId: currentUserId });
			socket.on('chatRoomList', getChatRooms);
		}

		if (matchingSocket) {
			matchingSocket.emit('getLatestMatching', { userId: currentUserId });
			matchingSocket.on('getLatestMatching', getLatestMatching);
			matchingSocket.on('matchingNotFound', matchingNotFound);
		}

		// 이벤트 리스너 정리
		// 컴포넌트가 언마운트되면 더 이상 이벤트를 수신하지 않음
		return () => {
			if (socket) {
				socket.off('getChatRooms', getChatRooms);
			}

			if (matchingSocket) {
				matchingSocket.off('getLatestMatching', getLatestMatching);
				matchingSocket.off('matchingNotFound', matchingNotFound);
			}
		};
	}, [socket, matchingSocket]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<RecentChatInfo $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
						최근 채팅방
					</RecentChatInfo>
					<ChatRoomList>
						<MatchingRoomItem {...latestMatching} />
						{chatRoomList.map((chatRoom) => (
							<ChatRoomItem key={chatRoom.id} {...chatRoom} />
						))}
					</ChatRoomList>
				</>
			)}
		</>
	);
};

export default RecentChat;
