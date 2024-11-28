import { BaseSuccessResponse } from '../core/dto';

// 댓글 작성
// Request
export type CreateCommentRequest = Content;
// Response
export type CreateCommentResponse = BaseSuccessResponse<CreateCommentData>;

//댓글 리스트 조회
// Response
export type GetCommentListResponse = BaseSuccessResponse<GetCommentListData>;

// 댓글 삭제
// Response : empty

interface Content {
	content: string;
}

interface CreateCommentData extends Content {}

export interface Comment {
	id: number;
	user: CommentUser;
	content: string;
	createdAt: string;
	isCommentWriter: boolean;
}

// 댓글 관련 User 정보
export interface CommentUser {
	userId: number;
	nickname: string;
	profilePictureUrl: string;
}

// 게시글 댓글 리스트 조회 응답
export interface GetCommentListData {
	comments: Comment[];
	totalCount: number;
}
