import { BaseApiResponse } from '../util/dto';

// 네이버 로그인
export type NaverLoginResponse = LoginResponse;

// 카카오 로그인
export type KakaoLoginResponse = LoginResponse;

// 회원 탈퇴
export type DeleteUserResponse = BaseApiResponse<DeleteUserResult>;

// 휴대폰 번호 본인인증 코드 전송 응답

// 휴대폰 번호 본인인증 코드 확인 응답

// 사용자 신고 요청 맟 응답
export type UpdateUserReportRequest = ReportRequest;
export type UpdateUserReportResponse = BaseApiResponse<ReportUserResult>;

// 사용자 정보 조회
export type GetUserResponse = BaseApiResponse<User>;

// 사용자 정보 수정
export type UpdateUserResponse = BaseApiResponse<User>;

// 사용자 차단/해제 요청 및 응답
export type CreateUserBlockRequest = BlockRequest;
export type CreateUserBlockResponse = BaseApiResponse<BlockResult>;

// 로그인 공통 응답 인터페이스
export interface LoginResponse {
	status: number;
	data: {
		message: string;
		accessToken: string;
	};
}

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

// 휴대폰 본인인증 코드 결과

// 휴대폰 본인인증 코드 확인 결과