import Layout from '@/components/layout/LayoutBase';
import { KpiCard } from '@/components/dashboard/KpiCard';
import VisitorsLineChart from '@/components/dashboard/LineChart';
import { Store, Tag, Users } from 'lucide-react';

interface DashboardProps {
  productsSold: number;
  productsAnnounced: number;
  visitorsData: { date: string; visitors: number }[];
}

const Dashboard = ({ productsSold, productsAnnounced, visitorsData }: DashboardProps) => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Últimos 30 dias</h1>
        <h2 className="text-gray-500">Confira as estatísticas da sua loja no último mês</h2>
      </div>

      <div className="flex flex-col justify-center items-center lg:flex-row w-full">
        <div className="flex flex-col gap-[15px] lg:w-[300px]">
          <KpiCard
            title="Produtos Vendidos"
            value={productsSold}
            icon={<Tag className="text-blue-dark" size={32} />}
          />
          <KpiCard
            title="Produtos Anunciados"
            value={productsAnnounced}
            icon={<Store className="text-blue-dark" size={32} />}
          />
          <KpiCard
            title="Pessoas Visitantes"
            value={visitorsData.reduce((acc, curr) => acc + curr.visitors, 0)}
            icon={<Users className="text-gray-400" size={32} />}
          />
        </div>

        <div className="flex-1 flex items-center mt-6 lg:mt-0">
          <VisitorsLineChart data={visitorsData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
