import { BaseSuccessResponse } from '../core';

// 네이버 로그인
export type NaverLoginResponse = BaseSuccessResponse<LoginResponse>;

// 카카오 로그인
export type KakaoLoginResponse = BaseSuccessResponse<LoginResponse>;

// 로그인 공통 응답 인터페이스
export interface LoginResponse {
	jwt: string;
}
