import { newRequest } from '@apis/core';
import type { getUserInfoByJwtResponse } from './dto';

// jwt로 사용자 정보 조회 api /auth/me
export const getUserInfoByJwtApi = () => newRequest.get<getUserInfoByJwtResponse>('/auth/me');
