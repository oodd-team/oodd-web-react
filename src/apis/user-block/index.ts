import { newRequest } from '@apis/core';

import type { EmptySuccessResponse } from '@apis/core/dto';

import type { PostUserBlockRequest } from './dto';

// 유저 차단 api
export const postUserBlockApi = (data: PostUserBlockRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-block', data);
