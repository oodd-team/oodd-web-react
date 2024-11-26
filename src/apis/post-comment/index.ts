import { newRequest } from '../core';
import { CreateCommentRequest, CreateCommentResponse, GetCommentListResponse } from './dto';
import { EmptySuccessResponse } from '../core/dto';

// 게시글 댓글 생성 API
export const createCommentApi = (postId: number, data: CreateCommentRequest) =>
	newRequest.post<CreateCommentResponse>(`/post-comment?postId=${postId}`, data);

//  게시글 댓글 리스트 조회
export const getCommentListApi = (postId: number) => newRequest.get<GetCommentListResponse>(`/post-comment/${postId}`);

// 게시글 댓글 삭제
export const deleteCommentApi = (commentId: number) =>
	newRequest.delete<EmptySuccessResponse>(`/post-comment/${commentId}`);
