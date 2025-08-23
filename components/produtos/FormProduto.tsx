'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@/components/ui/FormInput';
import { PriceInput } from '@/components/ui/PriceInput';
import { TextAreaInput } from '@/components/ui/TextAreaInput';
import { Button } from '@/components/ui/ButtonInput';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import ProductFileInput from '../ui/ProductImage';
import SelectInput from '../ui/SelectInput';
import { ProductCategory } from '@/types';


// Schema
const productSchema = z.object({
    title: z.string().min(1, { message: 'Nome é obrigatório.' }),
    price: z.string().min(1, { message: 'Preço é obrigatório.' }),
    description: z.string().min(1, { message: 'Descrição é obrigatória.' }),
    category: z.string().min(1, { message: 'Categoria é obrigatória.' }),
    image: z.instanceof(File).optional(),
});

type ProductFormInputs = z.infer<typeof productSchema>;

const ProductForm = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const router = useRouter();

    const methods = useForm<ProductFormInputs>({
        resolver: zodResolver(productSchema),
    });

    const { handleSubmit, formState: { errors, isSubmitting }, setError, watch, setValue } = methods;

    const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
        try {
            const formData = new FormData();
            const rawPrice = data.price.replace(/\./g, '').replace(',', '.');
            const priceNumber = parseFloat(rawPrice);

            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('price', priceNumber.toString());

            if (data.image instanceof File) {
                formData.append('image', data.image);
            }

            await api('/products', {
                method: 'POST',
                body: formData,
            });

            router.push('/produto');
        } catch (err: any) {
            setError('root.serverError', {
                type: 'manual',
                message: err.message || 'Erro ao cadastrar produto.',
            });
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="w-full flex flex-col md:flex-row md:items-start gap-2 md:gap-1">
                <div className="w-full md:w-2/5">
                    <ProductFileInput
                        label="Imagem"
                        name="image"
                        error={errors.image?.message}
                        onFileSelect={(file) => {
                            setValue('image', file ?? undefined);
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => setPreview(reader.result as string);
                                reader.readAsDataURL(file);
                            } else {
                                setPreview(null);
                            }
                        }}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
                    )}
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full md:w-3/5 bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6"
                >
                    {errors.root?.serverError && (
                        <div className="mb-4 text-red-500 text-sm font-medium">
                            {errors.root.serverError.message}
                        </div>
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
                        placeholder="Escreva detalhes sobre o produto, tamanho, características..."
                        error={errors.description?.message}
                        isFilled={!!watch('description')}
                        register={methods.register}
                    />
                    <SelectInput
                        label="Categoria"
                        items={Object.values(ProductCategory).map((cat) => ({
                            value: cat,
                            label: cat.replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()),
                        }))}
                        onSelect={(item) => setValue('category', item ? item.value : '')}
                    />


                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outlinePrimary"
                            className="w-1/2 flex items-center justify-center"
                            onClick={() => router.push('/products')}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-1/2 flex items-center justify-center"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Salvando...' : 'Salvar e Publicar'}
                        </Button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default ProductForm;
