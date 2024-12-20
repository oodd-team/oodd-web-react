import { BaseSuccessResponse } from '../core/dto';

// jwt를 이용한 사용자 정보 조회 응답
export type getUserInfoByJwtResponse = BaseSuccessResponse<getUserInfoByJwtData>;
// jwt를 이용한 사용자 정보 조회 응답 데이터
export interface getUserInfoByJwtData {
	userId: number;
	name: string;
	phoneNumber: string;
	email: string;
	nickname: string;
	profilePictureUrl: string;
	bio: string;
}
