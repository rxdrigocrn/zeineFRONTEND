'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock } from 'lucide-react';
import { api } from '@/lib/api';
import { TextInput } from '@/components/ui/FormInput';
import { Button } from '../ui/ButtonInput';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; // <-- React Toastify

const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      toast.success('Login realizado com sucesso!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err?.message || 'E-mail ou senha inválidos.');
    }
  };

  return (
    <div className="w-full md:w-2/5 flex items-center justify-center p-4 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white p-12 max-w-lg rounded-2xl shadow-lg max-h-[600px] flex flex-col justify-between"
      >
        <div className='flex flex-col mb-8'>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-500">Acesse sua conta</h2>
            <p className="text-sm text-gray-300 mb-6">
              Informe seu e-mail e senha para entrar.
            </p>
          </div>

          <div className="flex flex-col gap-6 mb-6">
            <TextInput<LoginFormInputs>
              label="E-MAIL"
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              register={register}
              error={errors.email?.message}
              leftIcon={<Mail size={20} />}
              isFilled={!!emailValue}
            />

            <TextInput<LoginFormInputs>
              label="SENHA"
              name="password"
              type="password"
              placeholder="Sua senha"
              register={register}
              error={errors.password?.message}
              leftIcon={<Lock size={20} />}
              isFilled={!!passwordValue}
            />
          </div>

          <div className="">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              rightIcon={<span className="ml-2">→</span>}
            >
              {isSubmitting ? 'Acessando...' : 'Acessar'}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex-col">
          <p className="text-sm text-gray-600 mb-[20px]">
            Ainda não tem uma conta?
          </p>

          <Button
            type="button"
            variant="outlinePrimary"
            className="mb-8"
            rightIcon={<span className="ml-2">→</span>}
            onClick={() => router.push('/register')}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
