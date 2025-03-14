import type { BaseSuccessResponse } from '@apis/core/dto';

// jwt를 이용한 사용자 정보 조회 응답
export type getUserInfoByJwtResponse = BaseSuccessResponse<getUserInfoByJwtData>;
// jwt를 이용한 사용자 정보 조회 응답 데이터
export interface getUserInfoByJwtData {
	id: number;
	name: string;
	phoneNumber: string;
	email: string;
	nickname: string;
	profilePictureUrl: string;
	bio: string;
	birthDate: string;
	userStyletags: string[];
}
