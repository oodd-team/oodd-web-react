export interface ApiDto {
	isSuccess: boolean;
	code: number;
	message: string;
	result: any[];
}

export interface PostReportDto {
	userId: number;
	postId: number;
	userName: string;
	reason: string;
}

export interface PostCommentDto {
	userName: string;
	postId: number;
}
