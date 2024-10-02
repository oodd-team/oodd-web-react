import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { RecentChatInfo } from './styles';
import React, { useEffect, useState } from 'react';
import request from '../../../apis/core';
import { ChatRoomDto, ChatRoomListDto } from './dto';
import ChatRoomList from '../ChatRoomList';
import SwiperCore from 'swiper';
import Loading from '../../../components/Loading';

interface RecentChatProps {
	matchingRequests: number;
	swiperRef: React.MutableRefObject<SwiperCore | null>;
}

const RecentChat: React.FC<RecentChatProps> = ({ matchingRequests, swiperRef }) => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomDto[]>();
	const storageValue = localStorage.getItem('id');
	const userId = storageValue ? Number(storageValue) : -1;
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getChatRoomList = async () => {
			try {
				setLoading(true);
				const response = await request.get<ChatRoomListDto>(`/chat-rooms/${userId}`);

				if (response.isSuccess) {
					const requestsList = response.result.filter((matchingRequest) => matchingRequest.fromUserId !== userId);
					const sortedList = requestsList.sort((a, b) => {
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
			} finally {
				setLoading(false);
			}
		};

		getChatRoomList();
	}, [matchingRequests]);

	return (
		<>
			<RecentChatInfo>
				{loading && <Loading />}
				<StyledText $textTheme={{ style: 'body4-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
					최근 채팅방
				</StyledText>
			</RecentChatInfo>
			{chatRoomList
				? chatRoomList.map((room) => {
						return <ChatRoomList key={room.id} swiperRef={swiperRef} {...room} />;
					})
				: null}
		</>
	);
};

export default RecentChat;
