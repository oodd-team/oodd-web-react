import { ExtendedMessageDto, RcvdMessageProps, SentMessageProps } from './dto';
import defaultProfile from '../../../assets/default/defaultProfile.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { OtherUserDto } from '../../../apis/chatting/dto';
import { chatRoomMessagesData } from '../../../apis/chatting/dto';

export const createExtendedMessages = (
	allMessages: chatRoomMessagesData[],
	userId: number,
	opponentInfo: OtherUserDto | null,
) => {
	// DateBar 표시 여부를 결정하는 함수
	const isNewDay = (curDate: string, lastDate: string) => {
		const curDateDayjs = dayjs(curDate);
		const lastDateDayjs = dayjs(lastDate);
		return !curDateDayjs.isSame(lastDateDayjs, 'day');
	};

	const temp: ExtendedMessageDto[] = allMessages.map((message: chatRoomMessagesData, index) => {
		const prevMessage = index !== 0 ? allMessages[index - 1] : null;
		const nextMessage = index !== allMessages.length - 1 ? allMessages[index + 1] : null;
		const formattedTime = dayjs(message.createdAt).format('HH:mm');

		// 채팅의 첫 메시지가 아니고, 날짜가 바뀐 경우
		// 날짜 표시줄 출력
		let isDateBarVisible = prevMessage !== null && isNewDay(message.createdAt, prevMessage.createdAt);

		// 채팅의 첫 메시지이거나 전송자 또는 날짜가 바뀐 경우
		// 프로필 사진 출력
		let isProfileImageVisible =
			prevMessage === null || prevMessage.fromUser.id !== message.fromUser.id || isDateBarVisible;

		// 가장 마지막 메시지이거나, 전송자 또는 시간 또는 날짜가 바뀌기 직전인 경우
		// 메시지 전송 시각 출력
		let isTimeVisible =
			nextMessage === null ||
			message.fromUser.id !== nextMessage.fromUser.id ||
			formattedTime !== dayjs(nextMessage.createdAt).format('HH:mm') ||
			isNewDay(nextMessage.createdAt, message.createdAt);

		// 채팅의 첫 메시지가 아니고, 전송자가 바뀐 경우
		// margin-top 추가
		let isSenderChanged = prevMessage !== null && !isDateBarVisible && prevMessage.fromUser.id !== message.fromUser.id;

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
				fromUserNickname: opponentInfo?.nickname || '알수없음',
				profilePictureUrl: opponentInfo?.profileUrl || defaultProfile,
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
