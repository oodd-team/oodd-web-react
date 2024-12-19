import axios, {
	AxiosInstance,
	AxiosInterceptorManager,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { NEW_JWT_KEY } from '../../config/constant';

// 기존 서버 응답 타입
export type BaseResponse<T = any> = {
	isSuccess: boolean;
	message: string;
	result: T;
};

export type PagingResponseType = {
	currentPage: number;
	totalPages: number;
	totalItems: number;
};

interface CustomInstance extends AxiosInstance {
	interceptors: {
		request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
		response: AxiosInterceptorManager<AxiosResponse>;
	};
	getUri(config?: AxiosRequestConfig): string;
	request<T>(config: AxiosRequestConfig): Promise<T>;
	get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	delete<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
	post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

// 새로운 서버 axios 인스턴스
export const newRequest: CustomInstance = axios.create({
	baseURL: import.meta.env.VITE_NEW_API_URL,
	timeout: 20000,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${NEW_JWT_KEY}`,
	},
});

newRequest.interceptors.request.use(
	(config) => {
		const jwt = window.localStorage.getItem(NEW_JWT_KEY);
		config.headers.Authorization = `Bearer ${jwt}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

newRequest.interceptors.response.use(
	(response) => {
		// 2XX 범위
		// response body 반환
		console.log('network log', response);
		return response.data;
	},
	(error) => {
		// 그 외
		// error로 AxiosError 타입 반환
		console.error(error);
		return Promise.reject(error);
	},
);
