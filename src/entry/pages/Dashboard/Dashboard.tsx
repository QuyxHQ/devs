import { DashboardMetrics, Libraries } from './components';

const Dashboard = () => {
    return (
        <section>
            <h1 className="page-title mb-4">Dashboard</h1>

            <DashboardMetrics />
            <Libraries />
        </section>
    );
};

export default Dashboard;
