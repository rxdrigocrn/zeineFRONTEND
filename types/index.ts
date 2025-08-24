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
    ANUNCIADO = 'Anunciado',
    VENDIDO = 'Vendido',
    CANCELADO = 'Desativado',
}

export type Category = {
    id: string;
    name: ProductCategory;
    slug: string;
    icon: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string | null;
    category: Category;
    categoryId: string;
    status: ProductStatus;
    createdAt: string;
    updatedAt: string;
    userId: string;
    slug: string;
}