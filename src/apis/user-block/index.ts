import { PostUserBlockRequest } from './dto';
import { EmptySuccessResponse } from '../core/dto';
import { newRequest } from '../core';

// 유저 차단 api
export const postUserBlockApi = (data: PostUserBlockRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-block', data);
