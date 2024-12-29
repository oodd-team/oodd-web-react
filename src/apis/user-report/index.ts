import { newRequest } from '@apis/core';
import type { EmptySuccessResponse } from '@apis/core/dto';
import type { PostUserReportRequest } from './dto';

// 유저 신고 api
export const postUserReportApi = (data: PostUserReportRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-report', data);
