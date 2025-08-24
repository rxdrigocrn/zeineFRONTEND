'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@/components/ui/FormInput';
import { PriceInput } from '@/components/ui/PriceInput';
import { TextAreaInput } from '@/components/ui/TextAreaInput';
import { Button } from '@/components/ui/ButtonInput';
import ProductFileInput from '@/components/ui/ProfileFileInput';
import SelectInput from '../ui/SelectInput';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/produtoStore';
import { api } from '@/lib/api';

const productSchema = z.object({
  title: z.string().min(1, { message: 'Nome é obrigatório.' }),
  price: z.string().min(1, { message: 'Preço é obrigatório.' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória.' }),
  category: z.string().min(1, { message: 'Categoria é obrigatória.' }),
  image: z.instanceof(File).optional(),
});

type ProductFormInputs = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  onSave?: (savedProduct: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave }) => {
  const router = useRouter();
  const { createOrUpdate, loading } = useProductStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  const methods = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  const { handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = methods;

  // Carrega categorias
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await api('/categories');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Popula form quando for edição
  useEffect(() => {
    if (!product) return;
    setValue('title', product.title);
    setValue('price', product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
    setValue('description', product.description);
    setValue('category', product.categoryId);
    if (product.image) setPreview(product.image);
  }, [product, setValue]);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    const formData = new FormData();
    const rawPrice = data.price.replace(/\./g, '').replace(',', '.');
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('categoryId', data.category);
    formData.append('price', parseFloat(rawPrice).toString());
    if (data.image instanceof File) formData.append('image', data.image);

    const savedProduct = await createOrUpdate(formData, product?.id, router);
    if (savedProduct && onSave) onSave(savedProduct);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full flex flex-col lg:flex-row lg:items-start gap-2 lg:gap-1">
        <div className="w-full lg:w-2/5">
          <ProductFileInput
            label="Imagem"
            name="image"
            error={errors.image?.message}
            previewUrl={preview ?? undefined}
            onFileSelect={(file) => {
              setValue('image', file ?? undefined);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
              } else setPreview(null);
            }}
          />
          {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-3/5 bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6"
        >
          {errors.root?.serverError && (
            <div className="mb-4 text-red-500 text-sm font-medium">{errors.root.serverError.message}</div>
          )}

          <h2 className="text-lg font-semibold text-gray-300">Dados do Produto</h2>
          <div className="flex gap-4">
            <TextInput<ProductFormInputs>
              label="Nome"
              name="title"
              type="text"
              placeholder="Ex: Camisa Polo"
              register={methods.register}
              error={errors.title?.message}
              isFilled={!!watch('title')}
            />
            <PriceInput
              name="price"
              label="Valor"
              placeholder="Ex: 99,90"
              register={methods.register}
            />
          </div>

          <TextAreaInput<ProductFormInputs>
            label="Descrição"
            name="description"
            rows={4}
            placeholder="Escreva detalhes sobre o produto..."
            error={errors.description?.message}
            isFilled={!!watch('description')}
            register={methods.register}
          />

          <SelectInput
            label="Categoria"
            items={categories.map((cat) => ({ label: cat.name, value: cat.id }))}
            value={watch('category')}
            onSelect={(item) => setValue('category', item ? item.value : '')}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outlinePrimary"
              className="w-1/2 flex items-center justify-center"
              onClick={() => router.push('/produto')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="w-1/2 flex items-center justify-center"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? 'Salvando...' : 'Salvar e Publicar'}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default ProductForm;
