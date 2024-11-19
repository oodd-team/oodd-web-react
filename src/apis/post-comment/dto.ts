import { BaseSuccessResponse } from "../core/dto";

// 공통 필드 인터페이스
interface BaseComment {
	id: number;
	userId: number;
	postId: number;
	content: string;
	createdAt: string;
	updatedAt: string;
}

// 댓글 관련 User 정보
export interface CommentUser {
	id: number;
	nickname: string;
	profilePictureUrl: string;
}

// 댓글 인터페이스
export interface Comment extends BaseComment {
	status: 'activated' | 'deactivated';
	deletedAt?: string | null;
	user?: CommentUser;
}

// 댓글 작성 응답
export interface postCommenttResponse extends BaseComment {}

// 댓글 삭제 응답
export type deleteCommentResponse = 
BaseSuccessResponse<deleteCommentData>

export interface deleteCommentData extends BaseComment {
	status: 'deactivated';
	deletedAt: string;
}

// 게시글 댓글 리스트 조회 응답
export interface getCommentResponse {
	comments: Comment[];
}
