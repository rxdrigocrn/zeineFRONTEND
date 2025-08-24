 import { cookies } from 'next/headers';
import Dashboard from '@/components/layout/Dashboard';

const DashboardPage = async () => {
  // Pega os cookies da requisição
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access_token')?.value;

  // Faz fetch para o backend passando o cookie
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`, {
    headers: {
      'Cookie': `access_token=${accessToken}`,
    },
    credentials: 'include',
  });

  const data = await res.json();

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
