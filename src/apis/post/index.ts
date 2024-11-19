import { newRequest } from '../core';
import {
	CreatePostRequest,
	CreatePostResponse,
	GetPostListResponse,
	GetPostDetailResponse,
	ModifyPostRequest,
	ModifyPostResponse,
} from './dto';
import { EmptySuccessResponse } from '../core/dto';

// 게시글 생성
export const createPostApi = (data: CreatePostRequest) => newRequest.post<CreatePostResponse>('/post', data);

// 게시글 리스트 조회
export const getPostListApi = (page: number, take: number, userId?: number) =>
	newRequest.get<GetPostListResponse>(`/post`, { params: { page, take, ...(userId && { userId }) } });

// 게시글 상세 조회
export const getPostDetailApi = (postId: number) => newRequest.get<GetPostDetailResponse>(`/post/${postId}`);

// 게시글 수정
export const modifyPostApi = (postId: number, data: ModifyPostRequest) =>
	newRequest.patch<ModifyPostResponse>(`/post/${postId}`, data);

// 게시글 삭제
export const deletePostApi = (postId: number) => newRequest.delete<EmptySuccessResponse>(`/post/${postId}`);

// 대표 게시글 지정
export const modifyPostRepresentativeStatusApi = (postId: number) =>
	newRequest.patch<EmptySuccessResponse>(`/post/${postId}/is-representative`);
