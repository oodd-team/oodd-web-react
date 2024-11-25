import { BaseSuccessResponse } from '../core/dto';

// 사용자 정보 공통 인터페이스
export interface UserInfoData {
	userId: number;
	name: string;
	phoneNumber: string;
	email: string;
	nickname: string;
	profilePictureUrl: string;
	bio: string;
	joinedAt?: string; // user 공통 인터페이스에 이 두 개는 안 나와있어서 일단 이것들만 optional 처리했습니다...
	isFriend?: boolean;
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
}

// 회원 탈퇴 응답
export type PatchUserWithDrawResponse = BaseSuccessResponse<PatchUserWithdrawData>;

// 회원 탈퇴 응답 데이터
export interface PatchUserWithdrawData {
	isSuccess: boolean;
	code: string;
	data: Record<string, never>; // 탈퇴 성공 시 항상 빈 객체가 응답으로 온다면 Record<string, never>으로 타입 안정성 높일 수 있답니다
}
