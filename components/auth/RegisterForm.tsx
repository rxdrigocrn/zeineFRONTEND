'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Phone, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';
import { TextInput } from '@/components/ui/FormInput';
import { Button } from '../ui/ButtonInput';

import FileInput from '../ui/ProfileFileInput';

const registerSchema = z.object({
    img_perfil: z.nullable(z.instanceof(File)).optional(),
    name: z.string().min(2, { message: 'O nome é obrigatório.' }),
    phone: z.string().min(8, { message: 'Telefone inválido.' }),
    email: z.string().email({ message: 'Insira um e-mail válido.' }),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
    confirmPassword: z.string().min(6, { message: 'Confirme sua senha.' }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não conferem.',
});

type RegisterFormInputs = z.infer<typeof registerSchema>;


const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const [filePreview, setFilePreview] = useState<string | undefined>();
    const router = useRouter();

    const nameValue = watch('name');
    const phoneValue = watch('phone');
    const emailValue = watch('email');
    const passwordValue = watch('password');
    const confirmPasswordValue = watch('confirmPassword');

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            const formData = new FormData();
            if (data.img_perfil instanceof File) {
                formData.append('profilePicture', data.img_perfil);
            }
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('email', data.email);
            formData.append('password', data.password);

            await api('/auth/register', {
                method: 'POST',
                body: formData,
            });

            router.push('/login');
        } catch (err: any) {
            setError('root.serverError', {
                type: 'manual',
                message: err.message || 'Erro ao cadastrar usuário.',
            });
        }
    };

    return (
        <div className="w-full md:w-2/5 flex  items-center justify-center p-4 min-h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-white p-12 max-w-lg rounded-2xl shadow-lg flex flex-col justify-between
               h-[700px] overflow-y-auto "
            >
                <div className="flex flex-col mb-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-500">Crie sua conta</h2>
                        <p className="text-sm text-gray-300 mb-6">
                            Preencha os dados para se cadastrar.
                        </p>
                    </div>

                    {errors.root?.serverError && (
                        <div className="mb-4 text-red-500 text-sm font-medium">
                            {errors.root.serverError.message}
                        </div>
                    )}

                    {/* Perfil */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-500 mb-5">Perfil</h3>
                        <div className="flex flex-col items-center gap-4">
                            <FileInput
                                label="Foto de perfil"
                                error={errors.img_perfil?.message as string}
                                onFileSelect={(file) => {
                                    if (file) {
                                        setFilePreview(URL.createObjectURL(file));
                                        setValue("img_perfil", file, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                    } else {
                                        setFilePreview(undefined);
                                        setValue("img_perfil", undefined, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
                                    }
                                }}
                            />



                            <TextInput<RegisterFormInputs>
                                label="NOME"
                                name="name"
                                type="text"
                                placeholder="Seu nome completo"
                                register={register}
                                error={errors.name?.message}
                                leftIcon={<User size={20} />}
                                isFilled={!!nameValue}
                            />

                            <TextInput<RegisterFormInputs>
                                label="TELEFONE"
                                name="phone"
                                type="text"
                                placeholder="(99) 99999-9999"
                                register={register}
                                error={errors.phone?.message}
                                leftIcon={<Phone size={20} />}
                                isFilled={!!phoneValue}
                            />
                        </div>
                    </div>

                    {/* Acesso */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-500 mb-5">Acesso</h3>
                        <div className="flex flex-col gap-6">
                            <TextInput<RegisterFormInputs>
                                label="E-MAIL"
                                name="email"
                                type="email"
                                placeholder="seuemail@exemplo.com"
                                register={register}
                                error={errors.email?.message}
                                leftIcon={<Mail size={20} />}
                                isFilled={!!emailValue}
                            />

                            <TextInput<RegisterFormInputs>
                                label="SENHA"
                                name="password"
                                type="password"
                                placeholder="Sua senha"
                                register={register}
                                error={errors.password?.message}
                                leftIcon={<Lock size={20} />}
                                isFilled={!!passwordValue}
                            />

                            <TextInput<RegisterFormInputs>
                                label="CONFIRMAR SENHA"
                                name="confirmPassword"
                                type="password"
                                placeholder="Repita sua senha"
                                register={register}
                                error={errors.confirmPassword?.message}
                                leftIcon={<Lock size={20} />}
                                isFilled={!!confirmPasswordValue}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="primary"
                        className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                        rightIcon={<span className="ml-2">→</span>}
                    >
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                    </Button>
                </div>

                <div className="mt-8 flex-col">
                    <p className="text-sm text-gray-600 mb-[20px]">Já tem uma conta?</p>
                    <Button
                        type="button"
                        variant="outlinePrimary"
                        className="mb-8"
                        rightIcon={<span className="ml-2">→</span>}
                        onClick={() => router.push('/login')}
                    >
                        Acessar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
