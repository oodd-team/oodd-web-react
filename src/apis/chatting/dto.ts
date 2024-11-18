// 채팅방 리스트 조회
// base response 형태를 따르지 않으므로 data 접미사를 사용했습니다.
// response
export interface ChatRoomData {
	chatRoomId: number;
	otherUser: OtherUser;
	latestMessage: LatestMessage;
}

export interface OtherUser {
	id: number;
	nickname: string;
	profileUrl: string;
}

export interface LatestMessage {
	content: string;
	createdAt: string;
}

// 채팅방 전체 대화 내역 조회
// 최근 메시지 수신
// response
export interface chatRoomMessagesData {
	id: number;
	content: string;
	fromUser: FromUser;
	toUser: ToUser;
	createdAt: string;
	toUserReadAt: any;
}

export interface FromUser {
	id: number;
	nickname: string;
	profileUrl: string;
}

export interface ToUser {
	id: number;
	nickname: string;
	profileUrl: string;
}
