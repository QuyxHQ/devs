import { useEffect, useState } from "react";
import { api } from "../../../../utils/class/api.class";
import { Loader } from "../../..";
import { AiOutlineQuestion } from "react-icons/ai";
import { RequestHealth } from ".";
import LineGraph from "./charts/LineGraph";

const MetricsLoader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center h-100 py-5">
      <Loader fill="#bbb" width={35} height={35} />
    </div>
  );
};

const EmptyResult = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5">
      <AiOutlineQuestion className="mb-2" />
      <p>nothing to show</p>
    </div>
  );
};

const DashboardMetrics = () => {
  const [dashMetrics, setDashMetrics] = useState<{
    total_requests: number;
    total_apps: number;
  }>();

  const [requestGrowth, setRequestGrowth] = useState<RequestGrowthResponse>();

  const [dailyRequestHealth, setDailyRequestHealth] = useState<{
    success_24: number;
    failed_24: number;
  }>();

  useEffect(() => {
    (async function () {
      const [reqGrowth, reqHealth, _dashMetrics] = await Promise.all([
        api.getRequestGrowth(),
        api.getRequestHealth(),
        api.getDevDashboardMetrics(),
      ]);

      if (reqGrowth.status) setRequestGrowth(reqGrowth.data);
      if (reqHealth.status) setDailyRequestHealth(reqHealth.data);
      if (_dashMetrics.status) setDashMetrics(_dashMetrics.data);
    })();
  }, []);

  return (
    <div className="pb-4">
      <div className="col-12">
        <div className="row g-3">
          <div className="col-12 col-xl-4">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-xl-12">
                <div className="metrics-box">
                  <h3>{dashMetrics?.total_apps.toLocaleString() ?? "--"}</h3>
                  <p>
                    Active App<small>(s)</small>
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-xl-12">
                <div className="metrics-box">
                  <h3>{dashMetrics?.total_requests.toLocaleString() ?? "--"}</h3>
                  <p>Requests (across all apps)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-8">
            <div className="d-flex flex-column flex-xl-row h-100" style={{ gap: "1rem" }}>
              <div className="w-100">
                <div className="metrics-box">
                  {dailyRequestHealth ? (
                    dailyRequestHealth.success_24 == 0 &&
                    dailyRequestHealth.failed_24 == 0 ? (
                      <EmptyResult />
                    ) : (
                      <div className="metrics-graph">
                        <h4>Daily Request Stat</h4>

                        <RequestHealth
                          data={[
                            {
                              total:
                                dailyRequestHealth.success_24 +
                                dailyRequestHealth.failed_24,
                              value: dailyRequestHealth.success_24,
                              fill: "dodgerblue",
                            },
                            {
                              total:
                                dailyRequestHealth.success_24 +
                                dailyRequestHealth.failed_24,
                              value: dailyRequestHealth.failed_24,
                              fill: "#F87171",
                            },
                          ]}
                        />

                        <div className="legends d-flex align-items-center justify-content-center">
                          <div className="d-flex align-items-center">
                            <span style={{ backgroundColor: "dodgerblue" }}></span>
                            <p>{dailyRequestHealth.success_24} successful</p>
                          </div>

                          <div className="d-flex align-items-center">
                            <span style={{ backgroundColor: "#F87171" }}></span>
                            <p>{dailyRequestHealth.failed_24} failed</p>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <MetricsLoader />
                  )}
                </div>
              </div>

              <div className="w-100">
                <div className="metrics-box">
                  {requestGrowth ? (
                    requestGrowth.total_week_1 == 0 && requestGrowth.total_week_2 == 0 ? (
                      <EmptyResult />
                    ) : (
                      <div className="metrics-graph">
                        <h4>Weekly Request Growth</h4>

                        <LineGraph data={requestGrowth} />

                        <div className="legends d-flex flex-column align-items-center justify-content-center">
                          <div className="d-flex align-items-center">
                            <span style={{ backgroundColor: "#8884d8" }}></span>
                            <p>This week: {requestGrowth.total_week_1} requests</p>
                          </div>

                          <div className="d-flex align-items-center">
                            <span style={{ backgroundColor: "#82ca9d" }}></span>
                            <p>Last week: {requestGrowth.total_week_2} requests</p>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <MetricsLoader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
