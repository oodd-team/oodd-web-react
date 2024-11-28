import { BaseSuccessResponse } from '../core/dto';

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
	chatRoomId: number;
	fromUserId: number;
	toUserId: number;
}

// 매칭 리스트 조회
// response
export type GetMatchingListResponse = BaseSuccessResponse<GetMatchingListData>;

export interface GetMatchingListData {
	isMatching: boolean; // 매칭 요청 존재 여부
	matchingsCount: number; // 매칭 요청 개수
	matching: MatchingDto[];
}

export interface MatchingDto {
	matchingId: number;
	requester: RequesterDto;
	requesterPost: RequesterPostDto;
}

export interface RequesterDto {
	requesterId: string;
	nickname: string;
	profilePictureUrl: string;
}

export interface RequesterPostDto {
	postImages: PostImageDto[]; // 대표 게시글 이미지
	styleTags: string[]; // 게시글 스타일 태그
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
	matchingId: number;
	requesterId: number;
	targetId: number;
	requestStatus: string;
	chatRoomId: number;
}
