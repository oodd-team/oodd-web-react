import { BaseSuccessResponse } from '../core/dto';

// 사용자 정보 공통 인터페이스
export interface User {
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

// 사용자 신고 요청 맟 응답 -> 스웨거 보니 응답 없는데 삭제 필요할 듯
export type UpdateUserReportRequest = ReportRequest;
export type UpdateUserReportResponse = BaseSuccessResponse<ReportUserResult>;

// 사용자 신고 요청
export interface ReportRequest {
	fromUserId: number;
	toUserId: number;
	reason: string;
}

// 사용자 신고 응답
export interface ReportUserResult {
	message: string;
}

// 사용자 차단/해제 요청 및 응답 -> 스웨거 보니 응답 없는데 삭제 필요할 듯
export type CreateUserBlockRequest = BlockRequest;
export type CreateUserBlockResponse = BaseSuccessResponse<BlockResult>;

// 차단/해제 요청 데이터
export interface BlockRequest {
	fromUserId: number;
	toUserId: number;
	action: 'block' | 'unblock'; // 차단 또는 해제
}

// 차단/해제 결과 응답
export interface BlockResult {
	message: string;
}

// 사용자 정보 조회
export type GetUserResponse = BaseSuccessResponse<User>;

// 사용자 정보 수정 요청 및 응답
export type CreateUpdateUserRequest = UpdateUserRequest;
export type UpdateUserResponse = BaseSuccessResponse<User>;

// 사용자 정보 수정 요청 데이터
export interface UpdateUserRequest {
	name: string;
	phoneNumber: string;
	email: string;
	nickname: string;
	profilePictureUrl: string;
	bio: string;
}

// 회원 탈퇴
export type DeleteUserResponse = BaseSuccessResponse<DeleteUserResult>;

// 회원 탈퇴 응답 데이터
export interface DeleteUserResult {
	isSuccess: boolean;
	code: string;
	data: Record<string, never>; // 탈퇴 성공 시 항상 빈 객체가 응답으로 온다면 Record<string, never>으로 타입 안정성 높일 수 있답니다
}
