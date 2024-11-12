export interface ApiDto {
	isSuccess: boolean;
	code: number;
	message: string;
	result: any[];
}

export interface MatchingInfoDto {
	requesterId: number;
	targetId: number;
	targetName: string;
}
