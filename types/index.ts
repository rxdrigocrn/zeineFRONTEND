// types/index.ts

export interface User {
    id: string;
    name: string | null;
    email: string;
    profileImage: string | null;
    createdAt: string;
    updatedAt: string;
}

export enum ProductCategory {
    BRINQUEDO = 'BRINQUEDO',
    MOVEL = 'MOVEL',
    PAPELARIA = 'PAPELARIA',
    SAUDE_E_BELEZA = 'SAUDE_E_BELEZA',
    UTENSILIO = 'UTENSILIO',
    VESTIARIO = 'VESTIARIO',
}

export enum ProductStatus {
    ANUNCIADO = 'ANUNCIADO',
    VENDIDO = 'VENDIDO',
    CANCELADO = 'CANCELADO',
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: ProductCategory;
    status: ProductStatus;
    createdAt: string;
    updatedAt: string;
    userId: string;
}