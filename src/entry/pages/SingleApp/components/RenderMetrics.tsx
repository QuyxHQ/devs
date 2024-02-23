import { HiOutlineUsers } from "react-icons/hi2";

const RenderMetrics = ({ data }: { data?: AppMetrics }) => {
  return (
    <div className="row g-3">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>{data?.successRate_hour1 ?? "--"}%</h3>
          <p>Successful Rate (last 1 hr)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>{data?.successRate_hour24 ?? "--"}%</h3>
          <p>Successful Rate (last 24 hr)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>{data?.avg_response_time_min5 ?? "--"}ms</h3>
          <p>Avg. Response Time (last 5 min)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>{data?.success_hour1.toLocaleString() ?? "--"}</h3>
          <p>Successful Requests (last 1 hr)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>{data?.failed_hour1.toLocaleString() ?? "--"}</h3>
          <p>Failed Requests (last 1 hr)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>
            {data ? (data.success_hour1 + data.failed_hour1).toLocaleString() : "--"}
          </h3>
          <p>Total Requests (last 1 hr)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>{data?.success_hour24.toLocaleString() ?? "--"}</h3>
          <p>Successful Request (last 24 hr)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>{data?.failed_hour24.toLocaleString() ?? "--"}</h3>
          <p>Failed Request (last 24 hr)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>
            {data ? (data.success_hour24 + data.failed_hour24).toLocaleString() : "--"}
          </h3>
          <p>Total Requests (last 24 hr)</p>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <div className="metrics-box">
          <h3>{data?.total_requests.toLocaleString() ?? "--"}</h3>
          <p>Total Request (all time)</p>
        </div>
      </div>

      <div className="col-12 col-md-8 col-lg-6">
        <div className="metrics-box flex-row align-items-center justify-content-between">
          <div>
            <h3>{data?.total_users.toLocaleString() ?? "--"}</h3>
            <p>Total Users</p>
          </div>

          <HiOutlineUsers size={45} stroke="#ccc" strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};

export default RenderMetrics;
