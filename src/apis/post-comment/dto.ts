import { BaseApiResponse } from '../util/dto';

// 댓글 작성 API 응답
export type CreateCommentResponse = BaseApiResponse<CreateCommentResult>;

// 댓글 삭제 API 응답
export type DeleteCommentResponse = BaseApiResponse<DeleteCommentResult>;

// 댓글 조회 API 응답
export type GetCommentsResponse = BaseApiResponse<GetCommentsResult>;

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
export interface CreateCommentResult extends BaseComment {}

// 댓글 삭제 응답
export interface DeleteCommentResult extends BaseComment {
	status: 'deactivated';
	deletedAt: string;
}

// 댓글 조회 응답
export interface GetCommentsResult {
	comments: Comment[];
}
