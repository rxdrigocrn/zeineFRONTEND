'use client';
import Layout from '@/components/layout/LayoutBase';
import ProductForm from '@/components/produtos/FormProduto';
import { Button } from '@/components/ui/ButtonInput';
import { Ban, Check, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EditarForm = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-orange-base mb-2 hover:underline"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Editar produto</h1>
            <p className="text-gray-500 text-sm md:text-base">
              Gerencie as informações do produto cadastrado
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="primary"
              rightIcon={<Check size={18} />}
            >
              Marcar como vendido
            </Button>
            <Button
              type="button"
              variant="primary"
              rightIcon={<Ban size={18} />}
            >
              Desativar anúncio
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-6">
        <ProductForm />
      </div>
    </Layout>
  );
};

export default EditarForm;
