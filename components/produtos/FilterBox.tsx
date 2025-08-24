'use client';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextInput } from '../ui/FormInput';
import SelectInput from '../ui/SelectInput';
import { Search, Tag } from 'lucide-react';
import { Button } from '../ui/ButtonInput';
import { useRouter, useSearchParams } from 'next/navigation';

const filterSchema = z.object({
    search: z.string().optional(),
    status: z.string().optional(),
});

type FilterFormInputs = z.infer<typeof filterSchema>;

const FilterBox = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const methods = useForm<FilterFormInputs>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            search: searchParams?.get('search') || '',
            status: searchParams?.get('status') || '',
        },
    });

    const { handleSubmit, setValue, watch } = methods;

    // Sincroniza os valores do form com a URL sem resetar o que o usuário digitou
    useEffect(() => {
        const searchParam = searchParams?.get('search') || '';
        const statusParam = searchParams?.get('status') || '';

        if (methods.getValues('search') !== searchParam) {
            setValue('search', searchParam);
        }
        if (methods.getValues('status') !== statusParam) {
            setValue('status', statusParam);
        }
    }, [searchParams, setValue, methods]);

    const onSubmit: SubmitHandler<FilterFormInputs> = async (data) => {
        const params = new URLSearchParams();
        if (data.search) params.append('search', data.search);
        if (data.status) params.append('status', data.status);
        params.append('page', '1');
        params.append('limit', '10');

        router.push(`/produto?${params.toString()}`);
    };

    return (
        <FormProvider {...methods}>
            <form
                className='bg-white max-w-sm w-full p-4 rounded-3xl shadow-lg'
                onSubmit={handleSubmit(onSubmit)}
            >
                <p className='font-bold text-lg mb-6'>Filtrar</p>

                <div className='flex flex-col gap-5 mb-10'>
                    <TextInput
                        leftIcon={<Search />}
                        register={methods.register}
                        label='Nome'
                        placeholder='Digite o nome do produto'
                        name='search'
                    />

                    <SelectInput
                        leftIcon={<Tag />}
                        label='Status'
                        items={[
                            { label: 'Anunciado', value: 'ANUNCIADO' },
                            { label: 'Vendido', value: 'VENDIDO' },
                            { label: 'Cancelado', value: 'CANCELADO' },
                        ]}
                        value={watch('status')} // Mantém o item selecionado
                        onSelect={(item) => setValue('status', item?.value)}
                    />
                </div>

                <Button type='submit' variant='primary' className='w-full py-4 flex justify-center' >
                    Aplicar filtros
                </Button>
            </form>
        </FormProvider>
    );
};

export default FilterBox;
