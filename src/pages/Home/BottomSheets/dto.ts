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
