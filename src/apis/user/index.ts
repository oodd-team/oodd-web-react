import {
	PostUserBlockRequest,
	PostUserReportRequest,
	PatchUserUpdateRequest,
	PatchUserUpdateResponse,
	PatchUserDeleteResponse,
} from './dto';
import { newRequest } from '../core';
import { EmptySuccessResponse } from '../core/dto';

// 유저 정보 수정 api
export const patchUserUpdateApi = (data: PatchUserUpdateRequest, userId: string) =>
	newRequest.patch<PatchUserUpdateResponse>(`/users/${userId}`, data);

// 유저 탈퇴 api
export const patchUserWithdrawApi = (userId: string) =>
	newRequest.patch<PatchUserDeleteResponse>(`/user/${userId}/withdraw`);

// 유저 차단 api
export const postUserBlockApi = (data: PostUserBlockRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-block', data);

// 유저 신고 api
export const postUserReportApi = (data: PostUserReportRequest) =>
	newRequest.post<EmptySuccessResponse>('/user-report', data);

// 이용 약관 동의 api
export const postAgreementUserApi = (userId: string) => newRequest.post<EmptySuccessResponse>(`/user/${userId}`);
