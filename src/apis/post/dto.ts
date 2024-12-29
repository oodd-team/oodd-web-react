import { BaseSuccessResponse } from '../core/dto';
import { PaginationMeta } from '../util/dto';

// 게시글 생성
//request
export type CreatePostRequest = PostBase;
//response
export type CreatePostResponse = BaseSuccessResponse<CreatePostData>;
// 게시글 리스트 조회
export type GetPostListResponse = BaseSuccessResponse<GetPostListData>;
export type GetUserPostListResponse = BaseSuccessResponse<GetUserPostListData>;
// 게시글 상세 조회
export type GetPostDetailResponse = BaseSuccessResponse<GetPostDetailData>;
// 게시글 수정
//request
export type ModifyPostRequest = PostBase;
//response
export type ModifyPostResponse = BaseSuccessResponse<ModifyPostData>;
// 게시글 삭제
// response : empty
// 대표 게시글 지정
// response : empty

export interface PostBase {
	content: string;
	postImages: PostImage[];
	postStyletags: string[];
	postClothings?: PostClothing[] | null;
	isRepresentative: boolean;
}
export interface CreatePostData extends PostBase {}
export interface PostSummary {
	id: number;
	content: string;
	postImages: PostImage[];
	createdAt: Date;
	isPostLike: boolean;
	user: User;
	requestStatus: boolean | null;
}
export interface GetPostListData {
	post: PostSummary[];
	meta: PaginationMeta;
}
export interface UserPostSummary {
	id: number;
	createdAt: Date;
	imageUrl: string;
	postLikesCount: number;
	postCommentsCount?: number;
	isPostLike: boolean;
	isPostComment?: boolean;
	isRepresentative: boolean;
}
export interface GetUserPostListData {
	post: UserPostSummary[];
	totalPostsCount: number;
	totalPostLikesCount: number;
	totalPostCommentsCount?: number;
	meta: PaginationMeta;
}
export interface ModifyPostData extends PostBase {
	id: number;
	userId: number;
}
export interface GetPostDetailData extends PostBase {
	createdAt: string;
	user: User;
	postCommentsCount: number;
	postLikesCount: number;
	isPostLike: boolean;
	isPostWriter: boolean;
}
export interface User {
	id: number;
	nickname: string;
	profilePictureUrl: string;
}
export interface PostImage {
	id?: number;
	status?: string;
	createdAt?: string;
	updatedAt?: string;
	url: string;
	orderNum: number;
}
export interface PostClothing {
	imageUrl: string;
	brandName: string;
	modelName: string;
	modelNumber: string;
	url: string;
}
