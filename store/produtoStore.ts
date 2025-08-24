import { create } from 'zustand';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';

interface ProductStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
  createOrUpdate: (product: FormData, productId?: string, router?: any) => Promise<Product | null>;
  sell: (productId: string, router?: any) => Promise<void>;
  cancel: (productId: string, router?: any) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),

  createOrUpdate: async (formData, productId, router) => {
    set({ loading: true });
    try {
      let savedProduct: Product;
      if (productId) {
        savedProduct = await api(`/products/${productId}`, { method: 'PATCH', body: formData });
        toast.success('Produto atualizado com sucesso!');
      } else {
        savedProduct = await api('/products', { method: 'POST', body: formData });
        toast.success('Produto criado com sucesso!');
      }
      if (router) router.push('/produto');
      return savedProduct;
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar produto');
      return null;
    } finally {
      set({ loading: false });
    }
  },

  sell: async (productId, router) => {
    set({ loading: true });
    try {
      await api(`/products/${productId}`, { method: 'PATCH', body: JSON.stringify({ status: 'Vendido' }) });
      toast.success('Produto marcado como vendido!');
      if (router) router.push('/produto');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao marcar como vendido');
    } finally {
      set({ loading: false });
    }
  },

  cancel: async (productId, router) => {
    set({ loading: true });
    try {
      await api(`/products/${productId}`, { method: 'PATCH', body: JSON.stringify({ status: 'Cancelado' }) });
      toast.success('Anúncio desativado!');
      if (router) router.push('/produto');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao desativar anúncio');
    } finally {
      set({ loading: false });
    }
  },
}));
