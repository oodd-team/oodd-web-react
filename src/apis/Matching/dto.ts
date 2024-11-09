import { BaseSuccessResponse } from '../core/dto';

// 매칭 요청
//request
export interface CreateMatchingRequest {
	requesterId: number;
	targetId: number;
	message: string;
}

// response
export type CreateMatchingResponse = BaseSuccessResponse<CreateMatchingData>;

export interface CreateMatchingData {
	chatRoomId: number;
	fromUserId: number;
	toUserId: number;
}
