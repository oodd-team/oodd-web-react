import { newRequest } from '../core';
import { CreateMatchingRequest, CreateMatchingResponse, GetMatchingListResponse } from './dto';

// 매칭 생성
export const createMatchingApi = (data: CreateMatchingRequest) =>
	newRequest.post<CreateMatchingResponse>('/matching', data);

// 매칭 리스트 조회
export const getMatchingListApi = () => newRequest.get<GetMatchingListResponse>('/matching');
