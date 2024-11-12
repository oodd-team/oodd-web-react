import { KakaoLoginResponse, NaverLoginResponse } from './dto';
import { newRequest } from '../core';

export const getKakaoLoginApi = (code: string) => newRequest.get<KakaoLoginResponse>(`/auth/login/kakao?code=${code}`);

export const getNaverLoginApi = (code: string) =>
	newRequest.get<NaverLoginResponse>(`/auth/login/naver?code=${code}&state=STATE_TOKEN`);
