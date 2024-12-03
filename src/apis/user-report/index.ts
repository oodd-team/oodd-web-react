import { PostUserReportRequest } from './dto';
import { EmptySuccessResponse } from '../core/dto';
import { newRequest } from '../core';

// 유저 신고 api
export const postUserReportApi = (data: PostUserReportRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-report', data);
