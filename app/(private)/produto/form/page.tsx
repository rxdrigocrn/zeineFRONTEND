'use client';
import Layout from '@/components/layout/LayoutBase';
import ProductForm from '@/components/produtos/FormProduto';
import { useRouter } from 'next/navigation';

const CriarForm = () => {

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Novo Produto</h1>
                <p className="text-gray-500">Cadastre um produto para venda no marketplace</p>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-6">
                <ProductForm />
            </div>
        </Layout>
    );
};

export default CriarForm;
