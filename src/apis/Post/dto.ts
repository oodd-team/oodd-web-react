import { BaseApiResponse } from '../util/dto';

// OOTD 조회
export type GetOOTDResponse = BaseApiResponse<PostByStyleTagResult>;

// 게시물 업로드 응답
export type CreatePostResponse = BaseApiResponse<PostResult>;

// 게시물 삭제 응답 (result가 null)
export type DeletePostResponse = BaseApiResponse<null>;

// 게시물 수정 응답
export type UpdatePostResponse = BaseApiResponse<PostResult>;

// 게시물 리스트 조회 (내 게시물일 때, 남의 게시물일 때)
export type GetPostListResponse = BaseApiResponse<PostListResult>;

// 게시물 상세 조회 (내 게시물일 때, 남의 게시물일 때)
export type GetPostDetailResponse = BaseApiResponse<PostDetailResult>;

// 게시물 신고 응답

// 대표 OOTD 지정 응답

// OOTD 리스트 조회 (스타일 태그에 따른)
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

//게시물
export interface PostResult {
	postId: number;
	userId: number;
	photoUrls: string[];
	content: string;
	styletags: string[];
	clothingInfo: ClothingInfo[] | null;
	isRepresentative: boolean;
}

export interface ClothingInfo {
	imageUrl: string;
	brand: string;
	model: string;
	modelNumber: string;
	url: string;
}

export interface PostSummary {
	postId: number;
	userId: number;
	likes: number | null;
	firstPhoto: string;
	isRepresentative: boolean;
	commentsCount: number; // 내 게시물(댓글 수 포함) | 남의 게시물(댓글 수 미포함)
}

export interface PostListResult {
	totalPosts: number;
	totalLikes: number;
	posts: PostSummary[];
}

export interface Comment {
	id: number;
	userId: number;
	text: string;
	timestamp: string;
}

export interface PostDetailResult {
	postId: number;
	userId: number;
	likes: number | null;
	comments: Comment[] | null; // 내 게시물(댓글 포함) | 남의 게시물(댓글 미포함)
	photoUrls: string[];
	content: string;
	styletags: string[];
	clothingInfo: ClothingInfo[] | null;
	isRepresentative: boolean;
}
