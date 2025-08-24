// lib/api.ts
import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://zeinebackend.onrender.com';

export async function api(path: string, options?: AxiosRequestConfig) {
    try {
        const url = `${baseUrl}${path}`;

        const isFormData = options?.data instanceof FormData;

        const defaultOptions: AxiosRequestConfig = {
            url,
            method: options?.method || 'GET',
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                ...options?.headers,
            },
            data: options?.data,
            withCredentials: true,
            maxRedirects: 0,
        };

        const response = await axios(defaultOptions);

        return response.data;
    } catch (err: any) {
        // Axios encapsula erros
        if (err.response?.data?.message) {
            throw new Error(err.response.data.message);
        }
        if (err.response) {
            throw new Error(`Erro ${err.response.status}: ${JSON.stringify(err.response.data)}`);
        }
        throw new Error(err.message || 'Erro desconhecido na requisição.');
    }
}
