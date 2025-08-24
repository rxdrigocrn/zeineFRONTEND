'use client';
import Dashboard from '@/components/layout/Dashboard';
import { api } from '@/lib/api';
import { DashboardResponse } from '@/types';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api('/dashboard/stats', { method: 'GET' });
        setData(res);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  const productsSold = data?.productsSold ?? 0;
  const productsAnnounced = data?.productsAnnounced ?? 0;
  const visitorsData = (data?.visitors ?? []).map((v: number, i: number) => {
    const date = new Date();
    date.setDate(date.getDate() - 29 + i);
    return {
      date: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`,
      visitors: v,
    };
  });

  return (
    <Dashboard
      productsSold={productsSold}
      productsAnnounced={productsAnnounced}
      visitorsData={visitorsData}
    />
  );
};

export default DashboardPage;
