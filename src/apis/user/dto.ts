import type { BaseSuccessResponse } from '@apis/core/dto';

// 사용자 정보 공통 인터페이스
export interface UserInfoData {
	id: number;
	name: string;
	phoneNumber: string;
	email: string;
	nickname: string;
	profilePictureUrl: string;
	bio: string;
	birthDate: string;
	isFriend: boolean;
	userStyletags: string[];
}

// 사용자 정보 조회 응답
export type GetUserInfoResponse = BaseSuccessResponse<UserInfoData>;

// 사용자 정보 수정 응답
export type PatchUserInfoResponse = BaseSuccessResponse<UserInfoData>;

// 사용자 정보 수정 요청 데이터
export interface PatchUserInfoRequest {
	name: string;
	phoneNumber: string;
	birthDate: string;
	email: string;
	nickname: string;
	profilePictureUrl: string;
	bio: string;
	userStyletags: string[];
}

// 회원 탈퇴 응답
export type PatchUserWithDrawResponse = BaseSuccessResponse<PatchUserWithdrawData>;

// 회원 탈퇴 응답 데이터
export interface PatchUserWithdrawData {
	isSuccess: boolean;
	code: string;
	data: Record<string, never>; // 탈퇴 성공 시 항상 빈 객체가 응답으로 온다면 Record<string, never>으로 타입 안정성 높일 수 있음
}
