import { KakaoLoginResponse, NaverLoginResponse } from './dto';
import { newRequest } from '../core';

// 카카오 로그인 api, url은 로그인 성공 후 jwt 파싱 위해 리다이렉트 되는 페이지의 url
export const getKakaoLoginApi = (redirectUrl: string) =>
	newRequest.get<KakaoLoginResponse>(`/auth/login/kakao?redirectUrl=${redirectUrl}`);

// 네이버 로그인 api
export const getNaverLoginApi = (redirectUrl: string) =>
	newRequest.get<NaverLoginResponse>(`/auth/login/naver?redirectUrl=${redirectUrl}`);

// jwt로 사용자 정보 조회 api /auth/me
