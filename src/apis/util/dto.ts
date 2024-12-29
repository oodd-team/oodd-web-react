export interface BaseApiResponse<T = any> {
	isSuccess: boolean;
	code: number;
	message: string;
	result: T | null; // result가 없는 경우를 위해 null 처리
}

export interface PagingResponseType {
	currentPage: number;
	totalPages: number;
	totalItems: number;
}

export interface PaginationMeta {
	total: number;
	page: number;
	take: number;
	last_page: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}
