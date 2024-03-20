import { CompleteOnboarding, DashboardMetrics, Libraries } from "./components";
import { useAppStore } from "../../context/AppProvider";

const Dashboard = () => {
  const { userInfo } = useAppStore();

  return (
    <section>
      <h1 className="page-title mb-4">Dashboard</h1>

      {!userInfo?.role ||
      !userInfo.heardUsFrom ||
      !userInfo.isEmailVerified ||
      !userInfo.company ? (
        <CompleteOnboarding />
      ) : null}

      <DashboardMetrics />

      <Libraries />
    </section>
  );
};

export default Dashboard;
