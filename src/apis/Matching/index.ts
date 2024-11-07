import { newRequest } from '../core';
import { CreateMatchingRequest, CreateMatchingResponse } from './dto';

export const createMatchingApi = (data: CreateMatchingRequest) =>
	newRequest.post<CreateMatchingResponse>('/matching', data);
