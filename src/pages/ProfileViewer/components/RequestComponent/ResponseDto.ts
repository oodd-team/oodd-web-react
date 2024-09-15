export interface ResponseDto {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		id: number;
		requester: {
			id: number;
			nickname: string;
			profilePictureUrl: string;
			name: string;
		};
		target: {
			id: number;
			nickname: string;
			profilePictureUrl: string;
			name: string;
		};
		message: string;
		requestStatus: string;
		rejectedAt: string;
		acceptedAt: string;
	};
}
