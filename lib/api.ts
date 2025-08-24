import Cookies from 'js-cookie';
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://zeinebackend.onrender.com';

export async function api(path: string, options?: RequestInit) {
    const url = `${baseUrl}${path}`;
    const isFormData = options?.body instanceof FormData;

    const token = Cookies.get('access_token');

    const defaultOptions: RequestInit = {
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options?.headers,
        },
    };

    const response = await fetch(url, mergedOptions);

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (response.status === 201) return data ?? {};

    if (!response.ok) {
        const errorMessage = data?.message || response.statusText || 'Erro inesperado';
        throw new Error(errorMessage);
    }

    return data ?? {};
}

