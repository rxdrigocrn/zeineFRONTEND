import Dashboard from '@/components/layout/Dashboard';
import { api } from '@/lib/api';

const DashboardPage = async () => {
    const data = await api('/dashboard/stats');

    const productsSold = data.productsSold;
    const productsAnnounced = data.productsAnnounced;
    const visitorsData = data.visitors.map((v: number, i: number) => {
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
