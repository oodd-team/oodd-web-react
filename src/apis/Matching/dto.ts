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
	matchingCount: number; // 매칭 요청 개수
	matching: Matching[];
}

export interface Matching {
	requester: Requester;
	requesterPost: RequesterPost;
}

export interface Requester {
	requesterId: string;
	nickname: string;
	profilePictureUrl: string;
}

export interface RequesterPost {
	postImages: PostImage[]; // 대표 게시글 이미지
	styleTags: string[]; // 게시글 스타일 태그
}

export interface PostImage {
	url: string;
	orderNum: number;
}
