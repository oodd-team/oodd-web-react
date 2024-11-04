import { BaseApiResponse } from '../util/dto';
import { User } from '../user/dto';

// 메세지 전송
//request
export type SendChatRequest = SendRequest;

// 채팅방 입장

// 메세지 조회

// 최근 메세지 조회

// 채팅방 목록 조회
export type GetChatRoomListResponse = BaseApiResponse<ChatRoomDto[]>;

// 채팅방 나가기
export type LeaveChatRoomResponse = BaseApiResponse;

export interface SendRequest {
	roomId: number;
	fromUserId: number;
	toUserId: number;
	message: string;
}

// 메세지 DTO
export interface MessageDto {
	id: number; // messageId
	status?: string;
	createdAt: Date; // 메시지 생성 시각
	updatedAt?: Date;
	deletedAt?: boolean | null;
	content: string; // 메시지 내용
	toUserReadAt?: boolean; // 메시지를 수신자가 읽은 시각
	fromUser: User;
	toUser: User;
}

// 확장된 메세지 DTO
export interface ExtendedMessageDto extends MessageDto {
	isNewDate: boolean;
	sentMessage?: SentMessageProps;
	rcvdMessage?: RcvdMessageProps;
}

// 전송된 메세지 속성
export interface SentMessageProps {
	content: string;
	isSenderChanged: boolean; // 상단 마진 추가 여부
	isPrintTime: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}

// 수신된 메세지 속성
export interface RcvdMessageProps {
	fromUserName: string;
	profilePictureUrl: string;
	content: string;
	isSenderChanged: boolean; // 상단 마진 추가 여부
	isFirst: boolean; // 사용자 프로필 표시 여부
	isPrintTime: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}

// 채팅방 상대 정보
export interface Opponent {
	id: number | null; // userId
	nickname: string | null;
	profilePictureUrl: string | null;
	name: string | null;
}

// 최근 메세지 정보
export interface LatestMessage {
	id: number | null; // userId
	createdAt: Date | null;
	content: string | null;
	toUserReadAt: Date | null;
}

// 채팅방 정보 DTO
export interface ChatRoomDto {
	id: number; // roomId
	fromUserId: number;
	requestStatus: string; // 요청 수락 여부
	createdAt: Date; // 채팅방 생성 시각
	opponent: Opponent;
	latestMessage: LatestMessage;
}
