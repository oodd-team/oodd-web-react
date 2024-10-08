import { BaseApiResponse } from '../util/dto';
import { User } from '../User/dto';

// 매칭 요청 Request/Response
export type MatchingRequestApiRequest = MatchingRequest;
export type MatchingRequestApiResponse = BaseApiResponse<MatchingResponse>;

// 매칭 요청 수락/거부
//Request
export type MatchingReponseApiRequest = MatchingResponseRequest;
//Response
export type MatchingReponseApiResponse = BaseApiResponse<MatchingResponse>;

// 매칭 리스트 조회
// Response
export type MatchingListApiResponse = BaseApiResponse<MatchingListResponse[]>;

// 매칭 요청 데이터
export interface MatchingRequest {
	requesterId: number;
	targetId: number;
	message: string;
}

// 매칭 상태 업데이트 (수락/거부) 데이터
export interface MatchingResponseRequest {
	id: number;
	requestStatus: 'rejected' | 'accepted';
}

// 매칭 응답 데이터 (요청 수락/거부 포함)
export interface MatchingResponse {
	id: number;
	requester: User;
	target: User;
	message: string;
	requestStatus: 'pending' | 'rejected' | 'accepted';
	rejectedAt?: string | null;
	acceptedAt?: string | null;
	createdAt: string;
}

// 매칭 리스트 조회 시 응답 데이터
export interface MatchingListResponse {
	id: number;
	status: string; // 요청의 현재 상태
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
	message: string;
	requestStatus: 'pending' | 'rejected' | 'accepted';
	rejectedAt?: string | null;
	acceptedAt?: string | null;
	target: User;
	requester: User;
	representativePost?: RepresentativePost; // 선택적 대표 게시물 정보
}

// 대표 게시물 정보
export interface RepresentativePost {
	id: number;
	status: 'activated' | 'deactivated';
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
	content: string;
	isRepresentative: boolean;
	images: PostImage[];
	postStyletags: StyleTag[];
	postClothings: PostClothing[];
}

// 게시물 이미지 정보
export interface PostImage {
	id: number;
	status: 'activated' | 'deactivated';
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
	postId: number;
	url: string;
	order: number;
}

// 스타일 태그 정보
export interface StyleTag {
	id: number;
	status: 'activated' | 'deactivated';
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
}

// 의류 항목 정보
export interface PostClothing {
	id: number;
	status: 'activated' | 'deactivated';
	createdAt: string;
	updatedAt: string;
	deletedAt?: string | null;
}
