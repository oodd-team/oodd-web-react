import { BaseSuccessResponse } from '../core/dto';

// 게시글 생성
//request
export type CreatePostRequest = PostBase;
//response
export type CreatePostResponse = BaseSuccessResponse<CreatePostData>;

// 게시글 리스트 조회
export type GetPostListResponse = BaseSuccessResponse<GetPostListData>;

// 게시글 상세 조회
export type GetPostResponse = BaseSuccessResponse<GetPostData>;

// 게시글 수정
//request
export type ModifyPostRequest = PostBase;
//response
export type ModifyPostResponse = BaseSuccessResponse<ModifyPostData>;

// 게시글 삭제
// response : empty

// 대표 게시글 지정
// response : empty

// OOTD 조회
//export type GetOOTDResponse = BaseSuccessResponse<PostByStyleTagResult>;

interface PaginationMeta {
	total: number;
	page: number;
	take: number;
	last_page: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export interface PostBase {
	content: string;
	postImages: PostImage[];
	postStyletags?: string[];
	postClothings?: PostClothing[] | null;
	isRepresentative?: boolean;
}

export interface CreatePostData extends PostBase {}

export interface GetPostListData {
	post: PostSummary[];
	meta: PaginationMeta;
}

export interface GetPostData extends PostDetailData {}

export interface ModifyPostData extends PostData {}

export interface PostSummary extends PostBase {
	postId: number;
	createdAt: Date;
	isPostLike: boolean;
	user: User;
	//likeCount: number;
	//commentCount: number;
	//isRepresentative: boolean;
}

export interface PostData extends PostBase {
	postId: number;
	userId: number;
}

export interface PostDetailData {
	content: string;
	createdAt: string;
	postImages: PostImage[];
	postClothings: PostClothing[] | null;
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

// OOTD 리스트 조회 (스타일 태그에 따른)
/*
export interface PostByStyleTag {
	postId: number;
	userId: number;
	likes: number;
	photoUrls: string[];
	content: string;
	styletags: string[];
}

export interface PostByStyleTagResult {
	posts: PostByStyleTag[];
}
*/
