import { GetUserInfoResponse, PatchUserInfoRequest, PatchUserInfoResponse, PatchUserWithDrawResponse } from './dto';
import { newRequest } from '../core';
import { EmptySuccessResponse } from '../core/dto';

// 유저 정보 수정 api
export const patchUserInfoApi = (data: PatchUserInfoRequest, userId: number) =>
	newRequest.patch<PatchUserInfoResponse>(`/user/${userId}`, data);

// 유저 탈퇴 api
export const patchUserWithdrawApi = (userId: number) =>
	newRequest.patch<PatchUserWithDrawResponse>(`/user/${userId}/withdraw`);

// 이용 약관 동의 api
export const postTermsAgreementApi = (userId: number) => newRequest.post<EmptySuccessResponse>(`/user/${userId}`);

// 유저 정보 조회 api
export const getUserInfoApi = (userId: number) => newRequest.get<GetUserInfoResponse>(`/user/${userId}`);
