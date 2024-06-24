import { HiOutlineUsers } from 'react-icons/hi2';
import { AnchorLink } from '../../..';

const RenderMetrics = ({ data, did }: { data?: SpaceMetrics; did: string }) => {
    return (
        <div className="row g-3">
            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>
                        {data?.percentageSuccessfulLast1Hr == 0
                            ? 0
                            : data?.percentageSuccessfulLast1Hr.toFixed(2) ?? '--'}
                        %
                    </h3>
                    <p>Successful Rate (last 1 hr)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>
                        {data?.percentageSuccessfulLast24Hrs == 0
                            ? 0
                            : data?.percentageSuccessfulLast24Hrs.toFixed(2) ?? '--'}
                        %
                    </h3>
                    <p>Successful Rate (last 24 hr)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>
                        {data
                            ? data.avgResponseTimeLast5Mins / 1000 == 0
                                ? 0
                                : (data.avgResponseTimeLast5Mins / 1000).toFixed(2)
                            : '--'}
                        s
                    </h3>
                    <p>Avg. Response Time (last 5 min)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>{data?.successfulRequestsLast1Hr.toLocaleString() ?? '--'}</h3>
                    <p>Successful Requests (last 1 hr)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>{data?.failedRequestsLast1Hr.toLocaleString() ?? '--'}</h3>
                    <p>Failed Requests (last 1 hr)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>{data ? data.totalRequestsLast1Hr.toLocaleString() : '--'}</h3>
                    <p>Total Requests (last 1 hr)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>{data?.successfulRequestsLast24Hrs.toLocaleString() ?? '--'}</h3>
                    <p>Successful Request (last 24 hr)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>{data?.failedRequestsLast24Hrs.toLocaleString() ?? '--'}</h3>
                    <p>Failed Request (last 24 hr)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>{data ? data.totalRequestsLast24Hrs.toLocaleString() : '--'}</h3>
                    <p>Total Requests (last 24 hr)</p>
                </div>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <div className="metrics-box">
                    <h3>{data?.totalRequestsAllTime.toLocaleString() ?? '--'}</h3>
                    <p>Total Request (all time)</p>
                </div>
            </div>

            <div className="col-12 col-md-8 col-xl-6">
                <AnchorLink to={`/space/users/${did}`}>
                    <div className="metrics-box flex-row align-items-center justify-content-between">
                        <div>
                            <h3>{'--'}</h3>
                            <p>View Users</p>
                        </div>

                        <HiOutlineUsers size={45} stroke="#ccc" strokeWidth={1} />
                    </div>
                </AnchorLink>
            </div>

            <div className="col-12 d-none d-md-block col-md-4 col-xl-2">
                <div className="extra-box"></div>
            </div>
        </div>
    );
};

export default RenderMetrics;
