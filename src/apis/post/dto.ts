import { BaseSuccessResponse } from '../core/dto';

// 게시글 생성
//request
export type CreatePostRequest = PostBase;
//response
export type CreatePostResponse = BaseSuccessResponse<CreatePostData>;
// 게시글 리스트 조회
export type GetPostListResponse = BaseSuccessResponse<GetPostListData>;
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
	postClothings: PostClothing[] | null;
	isRepresentative: boolean;
}
export interface CreatePostData extends PostBase {}
export interface GetPostListData {
	post: PostSummary[];
	totalPostsCount?: number;
	totalPostLikesCount?: number;
	totalPostCommentsCount?: number;
}
export interface GetPostDetailData extends PostDetailData {}
export interface ModifyPostData extends PostData {}
export interface PostSummary {
	postId: number;
	content: string;
	postImages: PostImage[];
	createdAt: Date;
	isPostLike: boolean;
	user: User;
	postLikesCount: number;
	postCommentsCount: number;
	isRepresentative: boolean;
}
export interface PostData extends PostBase {
	postId: number;
	userId: number;
}
export interface PostDetailData extends PostBase {
	createdAt: string;
	user: User;
	postCommentsCount: number;
	postLikesCount: number;
	isPostLike: boolean;
	isPostWriter: boolean;
}
export interface User {
	userId: number;
	nickname: string;
	profilePictureUrl: string;
}
export interface PostImage {
	imageUrl: string;
	orderNum: number;
}
export interface PostClothing {
	imageUrl: string;
	brandName: string;
	modelName: string;
	modelNumber: string;
	url: string;
}
