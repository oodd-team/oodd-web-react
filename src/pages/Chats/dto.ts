export interface UserDto {
	id: number;
	status: string; // ?
	createdAt: Date; // ?
	updatedAt: Date; // ?
	deletedAt: boolean | null; // ?
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string;
	bio: string | null;
	joinedAt: Date;
}

export interface MessageDto {
	id: number; // messageId
	status: string; //?
	createdAt: Date; // 메시지 생성 시각
	updatedAt: Date; // ?
	deletedAt: boolean | null; // ?
	content: string; // 메시지 내용
	toUserReadAt: boolean; // ?
	fromUser: UserDto;
	toUser: UserDto;
}

// export interface MessageDto1 {
// 	chatRoomId: number;
// 	id: number;
// 	text: string;
// 	fromUserId: number;
// 	toUserId: number;
// 	datetime: Date;
// }

export interface ExtendedMessageDto extends MessageDto {
	isNewDate: boolean;
	sentMessage?: SentMessageProps;
	rcvdMessage?: RcvdMessageProps;
}

export interface SentMessageProps {
	content: string; // 메시지 내용
	isSenderChanged: boolean; // 상단 마진 추가 여부
	isPrintTime: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}

export interface RcvdMessageProps {
	fromUserName: string; // 사용자명
	profilePictureUrl: string; // 프로필 이미지
	content: string; // 메시지 내용
	isSenderChanged: boolean; // 상단 마진 추가 여부
	isFirst: boolean; // 사용자 프로필 표시 여부
	isPrintTime: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}
