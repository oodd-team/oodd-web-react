export interface Opponent {
	id: number | null; // userId
	nickname: string | null;
	profilePictureUrl: string | null;
	name: string | null;
}

export interface LatestMessage {
	id: number | null; // userId
	createdAt: Date | null;
	content: string | null;
	toUserReadAt: Date | null;
}

export interface ChatRoomDto {
	id: number; // roomId
	createdAt: Date; // 채팅방이 만들어진 시간
	opponent: Opponent;
	latestMessage: LatestMessage;
}

export interface GetChatRoomListDto {
	isSuccess: boolean;
	code: number;
	message: string;
	result: ChatRoomDto[];
}
