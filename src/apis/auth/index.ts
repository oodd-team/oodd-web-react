import { getUserInfoByJwtResponse } from './dto';
import { newRequest } from '../core';

// jwt로 사용자 정보 조회 api /auth/me
export const getUserInfoByJwtApi = () => newRequest.get<getUserInfoByJwtResponse>('/auth/me');
