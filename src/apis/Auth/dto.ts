// 네이버 로그인
export type NaverLoginResponse = LoginResponse;

// 카카오 로그인
export type KakaoLoginResponse = LoginResponse;

// 로그인 공통 응답 인터페이스
export interface LoginResponse {
	status: number;
	data: {
		message: string;
		accessToken: string;
	};
}
