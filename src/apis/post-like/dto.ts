import type { BaseSuccessResponse } from '@apis/core/dto';
import type { PaginationMeta } from '@apis/util/dto';

// 좋아요 누르기/취소
export type TogglePostLikeStatusResponse = BaseSuccessResponse<TogglePostLikeStatusData>;

// 게시물 좋아요 리스트 조회
export type GetPostLikeListResponse = BaseSuccessResponse<GetPostLikeListData>;

export interface GetPostLikeListData {
	totalCount: number;
	likes: Like[];
	meta: PaginationMeta;
}

export interface User {
	id: number;
	nickname: string;
	profilePictureUrl: string;
}

export interface Like {
	user: User;
	createdAt: string;
}

export interface TogglePostLikeStatusData {
	id: number;
	isPostLike: boolean;
	postLikesCount: number;
}
