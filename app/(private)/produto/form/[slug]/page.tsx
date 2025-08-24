'use client';

import Layout from '@/components/layout/LayoutBase';
import ProductForm from '@/components/produtos/FormProduto';
import { ArrowLeft, Ban, Check } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { useProductStore } from '@/store/produtoStore';
import { api } from '@/lib/api';
import ActionLink from '@/components/ui/Link';

const EditarForm = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { sell, cancel, loading } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      const data = await api(`/products/slug/${slug}`);
      setProduct(data);
    };
    fetchProduct();
  }, [slug]);

  if (!product) return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <span className="text-gray-500">Carregando...</span>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="mb-8">
        <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-orange-base mb-2 hover:underline">
          <ArrowLeft size={18} /> Voltar
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Editar produto</h1>
            <p className="text-gray-500 text-sm md:text-base">Gerencie as informações do produto cadastrado</p>
          </div>

          <div className="flex gap-8 mt-auto">
            {!product?.status?.includes('Vendido') && (
              <ActionLink
                label="Marcar como vendido"
                icon={<Check size={18} />}
                disabled={loading || !product?.id}
                onClick={() => sell(product.id, router)}
              />
            )}
            {!product?.status?.includes('Cancelado') && (
              <ActionLink
                label="Desativar anúncio"
                icon={<Ban size={18} />}
                disabled={loading || !product?.id}
                onClick={() => cancel(product.id, router)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-6">
        <ProductForm product={product} />
      </div>
    </Layout>
  );
};

export default EditarForm;
