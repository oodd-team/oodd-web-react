export interface UserInfoDto {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		id: number;
		name: string;
		email: string;
		nickname: string;
		phoneNumber: string;
		profilePictureUrl: string;
		bio: string;
		joinedAt: string;
		isFriend: boolean;
	};
}
