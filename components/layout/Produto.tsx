// app/(private)/produto/page.tsx
import React from 'react';
import Layout from '@/components/layout/LayoutBase';
import ProductsList from '@/components/produtos/ProductsList';
import { api } from '@/lib/api';

const ProductsPage = async () => {
    let products = [];

    try {
        const response = await api('/products?page=1&limit=20', { method: 'GET', cache: 'no-store' });
        products = response.data ?? [];
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
    }

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Seus Produtos</h1>
                <p className="text-gray-500">
                    Acesse e gerencie a sua lista de produtos à venda
                </p>
            </div>

            <ProductsList initialProducts={products} />
        </Layout>
    );
};

export default ProductsPage;
