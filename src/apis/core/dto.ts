// 새로운 서버 응답 타입
export type BaseSuccessResponse<T = any> = {
	isSuccess: boolean;
	code: string;
	data: T;
};

// 응답 body가 없을 경우
export type EmptySuccessResponse = BaseSuccessResponse<void>;
