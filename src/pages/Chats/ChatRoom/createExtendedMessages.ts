import { ExtendedMessageDto, MessageDto, RcvdMessageProps, SentMessageProps } from '../dto';
import { Opponent } from '../RecentChat/dto';
import ProfileImg from '/ProfileImg.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const createExtendedMessages = (allMessages: MessageDto[], userId: number, opponentInfo: Opponent | null) => {
	// DateBar 표시 여부를 결정하는 함수
	const isNextDay = (curDate: Date, lastDate: Date): boolean => {
		const curDateDayjs = dayjs(curDate);
		const lastDateDayjs = dayjs(lastDate);
		return !curDateDayjs.isSame(lastDateDayjs, 'day');
	};

	const temp: ExtendedMessageDto[] = allMessages.map((message: MessageDto, index: number) => {
		const prevMessage = index !== 0 ? allMessages[index - 1] : null;
		const nextMessage = index !== allMessages.length - 1 ? allMessages[index + 1] : null;
		const formattedTime = dayjs(message.createdAt).format('HH:mm');

		// 채팅의 첫 메시지가 아니고, 날짜가 바뀐 경우 날짜 표시줄 출력
		let isNewDate = prevMessage !== null && isNextDay(message.createdAt, prevMessage.createdAt);

		// 채팅의 첫 메시지이거나 전송자 또는 날짜가 바뀐 경우 프로필 사진 출력
		let isFirst = prevMessage === null || prevMessage.fromUser.id !== message.fromUser.id || isNewDate;

		// 가장 마지막 메시지이거나,
		// 전송자 또는 시간 또는 날짜가 바뀌기 직전인 경우
		// 메시지 전송 시각 출력
		let isPrintTime =
			nextMessage === null ||
			message.fromUser.id !== nextMessage.fromUser.id ||
			formattedTime !== dayjs(nextMessage.createdAt).format('HH:mm') ||
			isNextDay(nextMessage.createdAt, message.createdAt);

		// 채팅의 첫 메시지가 아니고, 전송자가 바뀐 경우 margin-top 추가
		let isSenderChanged = prevMessage !== null && !isNewDate && prevMessage.fromUser.id !== message.fromUser.id;

		// 보낸 메시지일 경우 sentMessage 속성 추가
		// 받은 메시지일 경우 rcvdMessage 속성 추가
		if (message.fromUser.id === userId) {
			const sentMessage: SentMessageProps = { content: message.content, isSenderChanged, isPrintTime, formattedTime };
			return { ...message, isNewDate, sentMessage };
		} else {
			const rcvdMessage: RcvdMessageProps = {
				fromUserName: opponentInfo?.nickname || opponentInfo?.name || '알수없음',
				profilePictureUrl: opponentInfo?.profilePictureUrl || ProfileImg,
				content: message.content,
				isFirst,
				isSenderChanged,
				isPrintTime,
				formattedTime,
			};
			return { ...message, isNewDate, rcvdMessage };
		}
	});

	return temp;
};
