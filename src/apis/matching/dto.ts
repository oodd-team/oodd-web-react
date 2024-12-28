import type { BaseSuccessResponse } from '@apis/core/dto';

// 매칭 요청
// request
export interface CreateMatchingRequest {
	requesterId: number;
	targetId: number;
	message: string;
}

// response
export type CreateMatchingResponse = BaseSuccessResponse<CreateMatchingData>;

export interface CreateMatchingData {
	id: number; // matchingId
	chatRoomId: number;
	requesterId: number;
	targetId: number;
}

// 매칭 리스트 조회
// response
export type GetMatchingListResponse = BaseSuccessResponse<GetMatchingListData>;

export interface GetMatchingListData {
	hasMatching: boolean;
	matchingsCount: number;
	matching: MatchingDto[];
}

export interface MatchingDto {
	id: number; // matchingId
	requester: RequesterDto;
}

export interface RequesterDto {
	id: number; // requesterId
	nickname: string;
	profilePictureUrl: string;
	representativePost: RepresentativePost;
}

export interface RepresentativePost {
	postImages: PostImageDto[];
	styleTags: string[];
}

export interface PostImageDto {
	url: string;
	orderNum: number;
}

// 매칭 요청 수락 및 거절
// request
export interface ModifyMatchingStatusRequest {
	requestStatus: 'accept' | 'reject';
}

// response
export type ModifyMatchingStatusResponse = BaseSuccessResponse<ModifyMatchingStatusData>;

export interface ModifyMatchingStatusData {
	id: number; // matchingId
	requesterId: number;
	targetId: number;
	requestStatus: string;
	chatRoomId: number;
}
