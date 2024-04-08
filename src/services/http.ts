import axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from 'axios';

const baseInstance: AxiosInstance = axios.create({
	baseURL: 'https://dummyjson.com'
});

type HeadersProps = {
	[key: string]: string;
};
interface APIParamsType {
	method: 'get' | 'post' | 'put' | 'delete';
	route: string;
	body?: object;
	isAuthenticated?: boolean;
	params?: object;
	cancelToken: CancelTokenSource;
}

function getInstance({
	isAuthenticated = false,
	HeadersProps = {},
	params,
	cancelToken
}: {
	isAuthenticated?: boolean,
	HeadersProps?: HeadersProps,
	params?: object,
	cancelToken: CancelTokenSource
}):
	AxiosInstance {
	const instance: AxiosInstance = isAuthenticated
		? axios.create({ ...baseInstance.defaults, cancelToken: cancelToken.token })
		: baseInstance;

	instance.defaults.headers.common = HeadersProps;
	instance.defaults.params = params;
	return instance;
}


function callAPI<T>({
	method,
	route,
	body,
	isAuthenticated = false,
	params,
	cancelToken
}: APIParamsType): Promise<AxiosResponse<T>> {
	const instance = getInstance({ isAuthenticated, params, cancelToken });

	switch (method) {
		case 'get':
		case 'post':
		case 'put':
			return instance[method]<T>(route, body, { cancelToken: cancelToken.token });
		case 'delete':
			return instance.get<T>(route, { cancelToken: cancelToken.token });
		default:
			throw new Error(`Invalid HTTP method: ${method}`);
	}
}

export const getCancelToken = (): CancelTokenSource => axios.CancelToken.source();

export const HTTP = {

	Get: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'get' }),

	Post: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'post' }),

	Put: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'put' }),

	Delete: <T>(params: Omit<APIParamsType, 'method'>) =>
		callAPI<T>({ ...params, method: 'delete' })
};
