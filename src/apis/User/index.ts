import { UpdateUserResponse } from './dto';
import { newRequest } from '../core';

// 유저 정보 수정 api
export const patchUpdateUser = (userId: string) => newRequest.patch<UpdateUserResponse>(`/users/${userId}`);
