import { newRequest } from '../core';
import {
	CreateMatchingRequest,
	CreateMatchingResponse,
	GetMatchingListResponse,
	ModifyMatchingStatusRequest,
	ModifyMatchingStatusResponse,
} from './dto';

// 매칭 생성
export const createMatchingApi = (data: CreateMatchingRequest) =>
	newRequest.post<CreateMatchingResponse>('/matching', data);

// 매칭 리스트 조회
export const getMatchingListApi = () => newRequest.get<GetMatchingListResponse>('/matching');

// 매칭 요청 수락 및 거절
export const modifyMatchingStatusApi = (matchingId: number, data: ModifyMatchingStatusRequest) =>
	newRequest.patch<ModifyMatchingStatusResponse>(`/matching/${matchingId}`, data);
