import { BaseSuccessResponse } from '../core/dto';
import { BaseApiResponse } from '../util/dto';

// 회원 탈퇴
export type DeleteUserResponse = BaseApiResponse<DeleteUserResult>;

// 사용자 신고 요청 맟 응답
export type UpdateUserReportRequest = ReportRequest;
export type UpdateUserReportResponse = BaseSuccessResponse<ReportUserResult>;

// 사용자 정보 조회
export type GetUserResponse = BaseApiResponse<User>;

// 사용자 정보 수정
export type UpdateUserResponse = BaseSuccessResponse<User>;

// 사용자 차단/해제 요청 및 응답
export type CreateUserBlockRequest = BlockRequest;
export type CreateUserBlockResponse = BaseSuccessResponse<BlockResult>;

// 회원 탈퇴 응답 데이터
export interface DeleteUserResult {
	message: string;
}

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

// 사용자 정보 공통 인터페이스
export interface User {
	id: number;
	name: string;
	email: string;
	nickname?: string;
	phoneNumber?: string;
	profilePictureUrl?: string;
	bio?: string;
	joinedAt: string;
	isFriend?: boolean;
}

// 차단/해제 요청 데이터
export interface BlockRequest {
	userId: number;
	friendId: number;
	action: 'block' | 'unblock'; // 차단 또는 해제
}

// 차단/해제 결과 응답
export interface BlockResult {
	message: string;
}
