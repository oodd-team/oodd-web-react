import { UpdateUserResponse, CreateUserBlockRequest, UpdateUserReportRequest } from './dto';
import { newRequest } from '../core';
import { EmptySuccessResponse } from '../core/dto';

// 유저 정보 수정 api
export const patchUpdateUser = (userId: string) => newRequest.patch<UpdateUserResponse>(`/users/${userId}`);

// 유저 차단 api
export const postBlockUser = (data: CreateUserBlockRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-block', data);

// 유저 신고 api
export const postReportUser = (data: UpdateUserReportRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-report', data);
