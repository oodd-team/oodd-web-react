export interface KakaoLoginDto {
	status: number;
	data: {
		message: string;
		accessToken: string;
	};
}
