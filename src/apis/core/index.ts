import axios, {
	AxiosInstance,
	AxiosInterceptorManager,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

export const JWT_KEY = 'jwt_token';

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

export const request: CustomInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 20000,
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${localStorage.getItem(JWT_KEY)}`,
	},
});

request.interceptors.request.use(
	(config) => {
		const jwt = window.localStorage.getItem(JWT_KEY);
		if (jwt) {
			config.headers.Authorization = `Bearer ${jwt}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

request.interceptors.response.use(
	(response) => {
		console.log('network log', response);
		if (response.status === 200 || response.status === 201) {
			return response.data;
		} else {
			return Promise.reject(response.data.message);
		}
	},
	(error) => {
		return Promise.reject(error.code === 'ERR_NETWORK' ? '허용되지 않은 네트워크 접근입니다.' : error);
	},
);

export default request;
