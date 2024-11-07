import { newRequest } from '../core';
import { CreateMatchingRequest, CreateMatchingResponse } from './dto';

// 매칭 생성
export const createMatchingApi = (data: CreateMatchingRequest) =>
	newRequest.post<CreateMatchingResponse>('/matching', data);
