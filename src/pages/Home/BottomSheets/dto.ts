export interface PostRequestDto {
	requesterId: number;
	targetId: number;
	targetName: string;
}

export interface PostBlockDto {
	userId: number;
	friendId: number;
	friendName: string;
	action: 'toggle';
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
