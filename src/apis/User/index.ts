import {
	UpdateUserResponse,
	CreateUserBlockRequest,
	UpdateUserReportRequest,
	CreateUpdateUserRequest,
	DeleteUserResponse,
} from './dto';
import { newRequest } from '../core';
import { EmptySuccessResponse } from '../core/dto';

// 유저 정보 수정 api
export const patchUserUpdate = (data: CreateUpdateUserRequest, userId: string) =>
	newRequest.patch<UpdateUserResponse>(`/users/${userId}`, data);

// 유저 탈퇴 api
export const patchUserWithdraw = (userId: string) => newRequest.patch<DeleteUserResponse>(`/user/${userId}/withdraw`);

// 유저 차단 api
export const postUserBlock = (data: CreateUserBlockRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-block', data);

// 유저 신고 api
export const postUserReport = (data: UpdateUserReportRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-report', data);

// 이용 약관 동의 api
export const postAgreementUser = (userId: string) => newRequest.post<EmptySuccessResponse>(`/user/${userId}`);
