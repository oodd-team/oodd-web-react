import { useEffect, useState } from 'react';

import theme from '@styles/theme';

import { LatestMatchingData } from '@apis/matching/dto';
import { useSocket } from '@context/SocketProvider';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import Loading from '@components/Loading';
import { StyledText } from '@components/Text/StyledText';

import type { ChatRoomData } from '@apis/chatting/dto';

import ChatRoomItem from '../ChatRoomItem/index';
import MatchingRoomItem from '../MatchingRoomItem/index';

import { ChatRoomList, NoChatRoomWrapper, RecentChatInfo } from './styles';

const RecentChat: React.FC = () => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomData[]>([]);
	const [latestMatching, setLatestMatching] = useState<LatestMatchingData | null>();
	const [isLoading, setIsLoading] = useState(true);
	const socket = useSocket();
	const currentUserId = getCurrentUserId();

	useEffect(() => {
		// 채팅방 리스트 조회
		const getChatRooms = (data: ChatRoomData[]) => {
			setChatRoomList(data);
			setIsLoading(false);
		};

		// 최근 매칭 조회
		const getLatestMatching = (data: LatestMatchingData) => {
			setLatestMatching(data);
			console.log('getLatestMatching');
		};

		const matchingNotFound = (data: LatestMatchingData) => {
			console.log(data);
			console.log('matchingNotFound');
		};

		if (socket) {
			socket.emit('getChatRooms', { userId: currentUserId });
			socket.emit('getLatestMatching', { userId: currentUserId }, getLatestMatching);
			socket.on('getLatestMatching', getLatestMatching);
			socket.on('matchingNotFound', matchingNotFound);
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
						<MatchingRoomItem {...latestMatching} />
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
