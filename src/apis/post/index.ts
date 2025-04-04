import { useQuery } from '@tanstack/react-query';

import { newRequest } from '@apis/core';

import type { EmptySuccessResponse } from '@apis/core/dto';

import type {
	CreatePostRequest,
	CreatePostResponse,
	GetPostListResponse,
	GetUserPostListResponse,
	GetPostDetailResponse,
	ModifyPostRequest,
	ModifyPostResponse,
} from './dto';

// 게시글 생성
export const createPostApi = (data: CreatePostRequest) => newRequest.post<CreatePostResponse>('/post', data);

// 게시글 리스트 조회
// 전체 게시글 리스트
export const getPostListApi = async ({ pageParam = 1 }) => {
	const response = await newRequest.get<GetPostListResponse>('/post', {
		params: { page: pageParam, take: 10 },
	});
	return {
		posts: response.data.post,
		nextPage: response.data.post.length > 0 ? pageParam + 1 : undefined, // 다음 페이지 여부 확인
	};
};
// 유저 게시글 리스트
export const getUserPostListApi = (page: number = 1, take: number = 10, userId: number) =>
	newRequest.get<GetUserPostListResponse>(`/post`, { params: { page, take, userId } });

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

export const usePostDetail = (postId: number) => {
	return useQuery({
		queryKey: ['postDetail', postId],
		queryFn: () => getPostDetailApi(postId),
		enabled: !!postId, // postId가 존재할 때만 요청 수행
	});
};
