// 채팅방 리스트 조회
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
