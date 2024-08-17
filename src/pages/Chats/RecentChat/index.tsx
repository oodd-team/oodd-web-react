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

localStorage.setItem(
	'jwt_token',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VybmFtZSI6IuyehOuvvOyEnCIsImVtYWlsIjoibGltbXMxMjE3QG5hdmVyLmNvbSJ9.QB9vUJiu7YTqzwaA2NYDXC20xDfWWQ7ck2QhDh7Lsqs',
);

const RecentChat: React.FC = () => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomDto[]>();
	const userId = useRecoilValue(MockUserIdAtom);
	const allMessages = useRecoilValue(AllMesagesAtom);

	useEffect(() => {
		const getChatRoomList = async () => {
			try {
				const response = await request.get<ChatRoomListDto>(`/chat-rooms/${userId}`);

				if (response.isSuccess) {
					const sortedList = response.result.sort((a, b) => {
						// a와 b의 latestMessage.createdAt 값을 가져오고, 만약 null이면 createdAt 값을 사용
						const aDate = a.latestMessage?.createdAt
							? new Date(a.latestMessage.createdAt).getTime()
							: new Date(a.createdAt).getTime();
						const bDate = b.latestMessage?.createdAt
							? new Date(b.latestMessage.createdAt).getTime()
							: new Date(b.createdAt).getTime();
						// 가장 최근의 것이 먼저 오도록 내림차순 정렬
						return bDate - aDate;
					});
					setChatRoomList(sortedList);
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
