import { BaseApiResponse } from '../util/dto';

// 매칭 요청
//request
export interface CreateMatchingRequest {
	requesterId: number;
	targetId: number;
	message: string;
}

// response
export type CreateMatchingResponse = BaseApiResponse<CreateMatchingData>;

export interface CreateMatchingData {
	chatRoomId: number;
	fromUserId: number;
	toUserId: number;
}
