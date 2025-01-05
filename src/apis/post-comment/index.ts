import { newRequest } from '@apis/core';

import type { EmptySuccessResponse } from '@apis/core/dto';

import type { CreateCommentRequest, CreateCommentResponse, GetCommentListResponse } from './dto';

// 게시글 댓글 생성 API
export const createCommentApi = (postId: number, data: CreateCommentRequest) =>
	newRequest.post<CreateCommentResponse>(`/post-comment?postId=${postId}`, data);

//  게시글 댓글 리스트 조회
export const getCommentListApi = (postId: number) =>
	newRequest.get<GetCommentListResponse>(`/post-comment?postId=${postId}`);

// 게시글 댓글 삭제
export const deleteCommentApi = (commentId: number) =>
	newRequest.delete<EmptySuccessResponse>(`/post-comment/${commentId}`);
