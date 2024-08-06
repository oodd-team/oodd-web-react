import dayjs from 'dayjs';

export interface MessageDto {
	id: number;
	text: string;
	sender: string;
	receiver: string;
	timestamp: dayjs.Dayjs;
}

export interface ExtendedMessageDto extends MessageDto {
	isNewDate: boolean;
	sentMessage?: SentMessageProps;
	rcvdMessage?: RcvdMessageProps;
}

export interface SentMessageProps {
	text: string; // 메시지 내용
	isSenderChanged: boolean; // 상단 마진 추가 여부
	isPrintTime: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}

export interface RcvdMessageProps {
	sender: string; // 사용자명
	text: string; // 메시지 내용
	isSenderChanged: boolean; // 상단 마진 추가 여부
	isFirst: boolean; // 사용자 프로필 표시 여부
	isPrintTime: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}
