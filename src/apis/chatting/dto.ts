// 채팅방 리스트 조회
// base response 형태를 따르지 않으므로 data 접미사를 사용했습니다.
// response
export interface ChatRoomData {
	id: number;
	otherUser: OtherUserDto;
	latestMessage: LatestMessageDto;
}

export interface OtherUserDto {
	id: number;
	nickname: string;
	profilePictureUrl: string;
}

export interface LatestMessageDto {
	content: string;
	createdAt: string;
}

// 채팅방 전체 대화 내역 조회
// 최근 메시지 수신
// response
export interface chatRoomMessagesData {
	id: number;
	content: string;
	fromUser: FromUserDto;
	toUser: ToUserDto;
	createdAt: string;
	toUserReadAt: any;
}

export interface FromUserDto {
	id: number;
	nickname: string;
	profilePictureUrl: string;
}

export interface ToUserDto {
	id: number;
	nickname: string;
	profilePictureUrl: string;
}
