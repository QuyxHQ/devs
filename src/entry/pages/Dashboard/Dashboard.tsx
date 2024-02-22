import { useEffect, useState } from "react";
import { api } from "../../../utils/class/api.class";

const Dashboard = () => {
  //# 1 hr, 24 hrs, 7 days & 30 days
  const [hourRange, setHourRange] = useState<1 | 24 | 168 | 720>(1);

  const [requestGrowth, setRequestGrowth] = useState<{
    requests_week_1: number;
    requests_week_2: number;
  }>();

  const [weeklyRequestHealth, setWeeklyRequestHealth] = useState<{
    successful_requests: number;
    failed_requests: number;
  }>();

  const [requestHealth, setRequestHealth] = useState<{
    successful_requests: number;
    failed_requests: number;
  }>();

  useEffect(() => {
    (async function () {
      const [reqGrowth, reqHealth] = await Promise.all([
        api.getRequestGrowth(),
        api.getRequestHealth(),
      ]);

      if (reqGrowth.status) setRequestGrowth(reqGrowth.data);
      if (reqHealth.status) setWeeklyRequestHealth(reqHealth.data);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const to = new Date();
      const from = new Date();
      from.setHours(from.getHours() - hourRange);

      const resp = await api.getRequestHealthCustom({ from, to });
      if (resp.status) setRequestHealth(resp.data);
    })();
  }, [hourRange]);

  return (
    <section>
      <h1 className="page-title mb-4">Dashboard</h1>
    </section>
  );
};

export default Dashboard;
