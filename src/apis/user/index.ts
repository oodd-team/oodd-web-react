import { PatchUserInfoRequest, PatchUserInfoResponse, PatchUserWithDrawResponse } from './dto';
import { newRequest } from '../core';
import { EmptySuccessResponse } from '../core/dto';

// 유저 정보 수정 api
export const patchUserInfoApi = (data: PatchUserInfoRequest, userId: string) =>
	newRequest.patch<PatchUserInfoResponse>(`/user/${userId}`, data);

// 유저 탈퇴 api
export const patchUserWithdrawApi = (userId: string) =>
	newRequest.patch<PatchUserWithDrawResponse>(`/user/${userId}/withdraw`);

// 이용 약관 동의 api
export const postTermsAgreementApi = (userId: string) => newRequest.post<EmptySuccessResponse>(`/user/${userId}`);
