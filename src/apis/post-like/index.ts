import { newRequest } from '@apis/core';

import type { TogglePostLikeStatusResponse, GetPostLikeListResponse } from './dto';

// 게시글 좋아요 누르기/취소
export const togglePostLikeStatusApi = (postId: number) =>
	newRequest.post<TogglePostLikeStatusResponse>(`/post-like/${postId}`);

// 게시글 좋아요 리스트 조회 (페이지네이션 포함)
export const getPostLikeListApi = (postId: number, page: number = 1, take: number = 10) =>
	newRequest.get<GetPostLikeListResponse>(`/post-like/${postId}`, {
		params: { page, take },
	});
