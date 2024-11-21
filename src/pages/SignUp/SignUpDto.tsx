export interface UpdateUserInfoDto {
	name: string;
	birthdate: string;
	phonenumber: string;
	nickname: string;
	[key: string]: string; // 문자열 키에 대응하도록 설정
}
