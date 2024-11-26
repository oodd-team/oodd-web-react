import { BaseSuccessResponse } from '../core/dto';
import { PaginationMeta } from '../util/dto';

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
	meta: PaginationMeta;
}
export interface GetPostDetailData extends PostDetailData {}
export interface ModifyPostData extends PostData {}
export interface PostSummary {
	content: string;
	postImages: PostImage[];
	postId: number;
	createdAt: Date;
	isPostLike: boolean;
	user: User;
	likeCount: number;
	commentCount: number;
	isRepresentative: boolean;
	likes: number; // 추가
  firstPhoto: string; // 추가
}
export interface PostData extends PostBase {
	postId: number;
	userId: number;
}
export interface PostDetailData extends PostBase {
	createdAt: string;
	user: User;
	commentCount: number;
	likeCount: number;
	isPostLike: boolean;
	isPostWriter: boolean;
}
export interface User {
	userId: number;
	nickname: string;
	profilePictureUrl: string;
}
export interface PostImage {
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
