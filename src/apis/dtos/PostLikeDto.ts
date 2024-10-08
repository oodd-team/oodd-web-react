import { BaseApiResponse } from './util/ApiResponse';

// 좋아요 누르기/취소 응답
export type LikePostResponse = BaseApiResponse<BaseLike>;

// 본인 게시물의 좋아요 조회 응답 (유저 정보 포함)
export type PostLikesMyResponse = BaseApiResponse<PostLikesResponseData<LikeWithUser>>;

// 타인 게시물의 좋아요 조회 응답 (유저 정보 미포함)
export type PostLikesOtherResponse = BaseApiResponse<PostLikesResponseData<BaseLike>>;

// 공통 좋아요 인터페이스
interface BaseLike {
	id: number;
	userId: number;
	postId: number;
	status: 'activated' | 'deactivated';
	createdAt: string;
	updatedAt: string;
}

// 본인 게시물의 좋아요 인터페이스 (유저 정보 포함)
export interface LikeWithUser extends BaseLike {
	user: LikeUser;
}

export interface LikeUser {
	id: number;
	nickname: string;
	profilePictureUrl: string;
}

// 본인 및 타인 게시물의 좋아요 조회 응답 데이터
export interface PostLikesResponseData<T = LikeWithUser | BaseLike> {
	totalLikes?: number; // 본인 게시물일 때만 존재
	likes: T[]; // 좋아요 배열 (BaseLike 또는 LikeWithUser)
	isLiked: boolean; // 본인 또는 타인의 게시물에 대한 좋아요 여부
}
