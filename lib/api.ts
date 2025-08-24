const baseUrl = "https://zeinebackend.onrender.com"

/**
 * Um wrapper para a API fetch nativa que configura automaticamente
 * a URL base, o envio de cookies (credentials: 'include'),
 * e o tratamento padronizado de erros e respostas.
 * @param path O caminho do endpoint (ex: '/auth/login')
 * @param options As opções do fetch (method, body, headers, etc.)
 * @returns A resposta da API em formato JSON
 */
export async function api(path: string, options?: RequestInit) {
    const url = `${baseUrl}${path}`;

    // Se o body for FormData, não define Content-Type
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
