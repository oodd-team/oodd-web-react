import { BaseSuccessResponse } from '../core/dto';
import { BaseApiResponse } from '../util/dto';

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
export type GetUserResponse = BaseApiResponse<User>;

// 사용자 정보 수정
export type UpdateUserResponse = BaseSuccessResponse<User>;

// 회원 탈퇴
export type DeleteUserResponse = BaseApiResponse<DeleteUserResult>;

// 회원 탈퇴 응답 데이터
export interface DeleteUserResult {
	message: string;
}
