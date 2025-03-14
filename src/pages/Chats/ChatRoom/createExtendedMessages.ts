import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import defaultProfile from '@assets/default/defaultProfile.svg';

import type { OtherUserDto, ChatRoomMessagesData } from '@apis/chatting/dto';

import { RcvdMessageProps } from '../RcvdMessage/dto';
import { SentMessageProps } from '../SentMessage/dto';

import type { ExtendedMessageDto } from './dto';

export const createExtendedMessages = (
	allMessages: ChatRoomMessagesData[],
	userId: number,
	otherUser: OtherUserDto | null,
) => {
	// DateBar 표시 여부를 결정하는 함수
	const isNewDay = (curDate: string, lastDate: string) => {
		const curDateDayjs = dayjs(curDate);
		const lastDateDayjs = dayjs(lastDate);

		return !curDateDayjs.isSame(lastDateDayjs, 'day');
	};

	// 렌더링에 필요한 요소를 추가한 메시지 배열
	const temp: ExtendedMessageDto[] = allMessages.map((message: ChatRoomMessagesData, index) => {
		const prevMessage = index !== 0 ? allMessages[index - 1] : null;
		const nextMessage = index !== allMessages.length - 1 ? allMessages[index + 1] : null;
		const formattedTime = dayjs(message.createdAt).format('HH:mm');

		// 채팅의 첫 메시지가 아니고, 날짜가 바뀐 경우
		// 날짜 표시줄 출력
		const isDateBarVisible = prevMessage !== null && isNewDay(message.createdAt, prevMessage.createdAt);

		// 채팅의 첫 메시지이거나 전송자 또는 날짜가 바뀐 경우
		// 프로필 사진 출력
		const isProfileImageVisible =
			prevMessage === null || prevMessage.fromUser.id !== message.fromUser.id || isDateBarVisible;

		// 가장 마지막 메시지이거나, 전송자 또는 시간이 바뀌기 직전인 경우
		// 메시지 전송 시각 출력
		const isTimeVisible =
			nextMessage === null ||
			message.fromUser.id !== nextMessage.fromUser.id ||
			formattedTime !== dayjs(nextMessage.createdAt).format('HH:mm');

		// 채팅의 첫 메시지가 아니고, 전송자가 바뀐 경우
		// margin-top 추가
		const isSenderChanged =
			prevMessage !== null && !isDateBarVisible && prevMessage.fromUser.id !== message.fromUser.id;

		if (message.fromUser.id === userId) {
			// 보낸 메시지일 경우 sentMessage 속성 추가
			const sentMessage: SentMessageProps = {
				content: message.content,
				isSenderChanged,
				isTimeVisible,
				formattedTime,
			};
			return { ...message, isDateBarVisible, sentMessage };
		} else {
			// 받은 메시지일 경우 rcvdMessage 속성 추가
			const rcvdMessage: RcvdMessageProps = {
				fromUserNickname: otherUser?.nickname || '알수없음',
				profilePictureUrl: otherUser?.profilePictureUrl || defaultProfile,
				content: message.content,
				isProfileImageVisible,
				isSenderChanged,
				isTimeVisible,
				formattedTime,
			};
			return { ...message, isDateBarVisible, rcvdMessage };
		}
	});

	return temp;
};
