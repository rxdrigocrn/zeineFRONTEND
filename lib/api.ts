const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://zeinebackend.onrender.com';


export async function api(path: string, options?: RequestInit) {
    const url = `${baseUrl}${path}`;

    const isFormData = options?.body instanceof FormData;

    const defaultOptions: RequestInit = {
        credentials: 'include',
        headers: {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
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

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({
            message: 'Erro desconhecido na resposta da API.',
        }));
        throw new Error(errorData.message || 'Ocorreu um erro na requisição.');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return {};
}
