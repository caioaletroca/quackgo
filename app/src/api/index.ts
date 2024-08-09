import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export const getFetcher = async (url: string, config: AxiosRequestConfig) => {
	const { data } = await api.get(url, config);
	return data;
};

export default api;