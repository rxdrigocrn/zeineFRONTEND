'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import FilterBox from './FilterBox';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { useSearchParams, useRouter } from 'next/navigation';
import { MessageCircleWarningIcon } from 'lucide-react';
import Loader from '../ui/Loader';

interface ProductsListProps {
    initialProducts: Product[];
    page?: number;
    limit?: number;
}

const ProductsList: React.FC<ProductsListProps> = ({
    initialProducts,
    page = 1,
    limit = 20,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [loading, setLoading] = useState(false);

    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (status) params.append('status', status);
                params.append('page', page.toString());
                params.append('limit', limit.toString());

                const response = await api(`/products?${params.toString()}`, { method: 'GET' });
                setProducts(response.data ?? []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, status, page, limit]);

    if (loading) return <Loader />;

    return (
        <div className="flex flex-col lg:flex-row w-full gap-6">
            <div className="w-full lg:w-1/3">
                <FilterBox />
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                {products.length > 0 ? (
                    products.map((product) => {
                        const imageUrl = product.image?.startsWith('http')
                            ? product.image
                            : `${process.env.NEXT_PUBLIC_API_URL}${product.image}`;

                        return (
                            <div
                                key={product.id}
                                className="cursor-pointer"
                                onClick={() => router.push(`/produto/form/${product.slug}`)}
                            >
                                <ProductCard
                                    status={product.status}
                                    category={product.category}
                                    image={imageUrl}
                                    title={product.title}
                                    description={product.description}
                                    price={product.price}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-1 lg:col-span-2 bg-shape-dark rounded-2xl flex items-center justify-center gap-2 p-4 text-gray-300 flex-col">
                        <MessageCircleWarningIcon size={64} />
                        <p>Você ainda não tem nenhum produto cadastrado aqui.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsList;
