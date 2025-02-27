import { newRequest } from '@apis/core';

import type {
	CreateMatchingRequest,
	CreateMatchingResponse,
	ModifyMatchingStatusRequest,
	ModifyMatchingStatusResponse,
} from './dto';

// 매칭 생성
export const createMatchingApi = (data: CreateMatchingRequest) =>
	newRequest.post<CreateMatchingResponse>('/matching', data);

// 매칭 요청 수락 및 거절
export const modifyMatchingStatusApi = (matchingId: number, data: ModifyMatchingStatusRequest) =>
	newRequest.patch<ModifyMatchingStatusResponse>(`/matching/${matchingId}`, data);
