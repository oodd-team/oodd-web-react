import { AxiosError } from 'axios';
import { ApiDomain, errorMessages } from './errorMessage';

export const handleError = (error: unknown, domain: ApiDomain = 'default') => {
	const message = errorMessages[domain];
	const status = (error as AxiosError).response ? (error as AxiosError).response?.status : 999;

	return message[status || 0] || '알 수 없는 오류입니다.';
};
