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

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return {};
}
