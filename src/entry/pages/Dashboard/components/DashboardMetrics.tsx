import { useEffect, useState } from "react";
import { api } from "../../../../utils/class/api.class";
import { FormGroup, Loader } from "../../..";
import { AiOutlineQuestion } from "react-icons/ai";

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
  //# 1 hr, 24 hrs, 7 days & 30 days (1 | 24 | 168 | 720)
  const [hourRange, setHourRange] = useState<string>("1");

  const [dashMetrics, setDashMetrics] = useState<{
    total_requests: number;
    total_apps: number;
  }>();

  const [requestGrowth, setRequestGrowth] = useState<{
    requests_week_1: number;
    requests_week_2: number;
  }>();

  const [dailyRequestHealth, setDailyRequestHealth] = useState<{
    success_24: number;
    failed_24: number;
  }>();

  const [requestHealth, setRequestHealth] = useState<{
    successful_requests: number;
    failed_requests: number;
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

  useEffect(() => {
    (async function () {
      setRequestHealth(undefined);

      const to = new Date();
      const from = new Date();
      from.setHours(from.getHours() - parseInt(hourRange));

      const resp = await api.getRequestHealthCustom({ from, to });
      if (resp.status) setRequestHealth(resp.data);
    })();
  }, [hourRange]);

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
                      "Graph here..."
                    )
                  ) : (
                    <MetricsLoader />
                  )}
                </div>
              </div>

              <div className="w-100">
                <div className="metrics-box">
                  {requestGrowth ? (
                    requestGrowth.requests_week_1 == 0 &&
                    requestGrowth.requests_week_2 == 0 ? (
                      <EmptyResult />
                    ) : (
                      "Graph here..."
                    )
                  ) : (
                    <MetricsLoader />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="metrics-box">
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ marginTop: "-0.8rem", gap: "0.6rem" }}
              >
                <h4 style={{ fontWeight: 600, fontSize: "1.05rem", lineHeight: "150%" }}>
                  Request Health
                </h4>

                <FormGroup
                  getter={hourRange}
                  setter={setHourRange}
                  label="range"
                  options={[
                    { label: "Past 1 hr", value: "1" },
                    { label: "Past 24 hr", value: "24" },
                    { label: "Past 7 days", value: "168" },
                    { label: "Past 30 days", value: "720" },
                  ]}
                  inputType="select"
                  displayLabel={false}
                  displayOthersInSelect={false}
                />
              </div>
              {requestHealth ? (
                requestHealth.failed_requests == 0 &&
                requestHealth.successful_requests == 0 ? (
                  <div className="py-5">
                    <EmptyResult />
                  </div>
                ) : (
                  "Graph here..."
                )
              ) : (
                <div className="py-5">
                  <MetricsLoader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
