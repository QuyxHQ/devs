import { useEffect, useState } from 'react';
import { api } from '../../../../utils/class/api.class';
import { Loader } from '../../..';
import { AiOutlineQuestion } from 'react-icons/ai';
import { RequestHealth } from '.';
import LineGraph from './charts/LineGraph';

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
    const [metrics, setMetrics] = useState<DashboardMetrics>();

    useEffect(() => {
        (async function () {
            const metrics = await api.getDevDashboardMetrics();
            setMetrics(metrics);
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
                                    <h3>{metrics?.total_spaces.toLocaleString() ?? '--'}</h3>
                                    <p>
                                        Active Spaces<small>(s)</small>
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-xl-12">
                                <div className="metrics-box">
                                    <h3>{metrics?.total_logs.toLocaleString() ?? '--'}</h3>
                                    <p>Requests (across all spaces)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-8">
                        <div
                            className="d-flex flex-column flex-xl-row h-100"
                            style={{ gap: '1rem' }}
                        >
                            <div className="w-100">
                                <div className="metrics-box">
                                    {metrics ? (
                                        metrics.failedRequestsLast24Hr == 0 &&
                                        metrics.successfulRequestsLast24Hr == 0 ? (
                                            <EmptyResult />
                                        ) : (
                                            <div className="metrics-graph">
                                                <h4>Daily Request Stat</h4>

                                                <RequestHealth
                                                    data={[
                                                        {
                                                            total:
                                                                metrics.successfulRequestsLast24Hr +
                                                                metrics.failedRequestsLast24Hr,
                                                            value: metrics.successfulRequestsLast24Hr,
                                                            fill: 'dodgerblue',
                                                        },
                                                        {
                                                            total:
                                                                metrics.successfulRequestsLast24Hr +
                                                                metrics.failedRequestsLast24Hr,
                                                            value: metrics.failedRequestsLast24Hr,
                                                            fill: '#F87171',
                                                        },
                                                    ]}
                                                />

                                                <div className="legends d-flex align-items-center justify-content-center">
                                                    <div className="d-flex align-items-center">
                                                        <span
                                                            style={{
                                                                backgroundColor: 'dodgerblue',
                                                            }}
                                                        />
                                                        <p>
                                                            {metrics.successfulRequestsLast24Hr}{' '}
                                                            successful
                                                        </p>
                                                    </div>

                                                    <div className="d-flex align-items-center">
                                                        <span
                                                            style={{ backgroundColor: '#F87171' }}
                                                        />
                                                        <p>
                                                            {metrics.failedRequestsLast24Hr} failed
                                                        </p>
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
                                    {metrics ? (
                                        metrics.logs.week1.total_week == 0 &&
                                        metrics.logs.week2.total_week == 0 ? (
                                            <EmptyResult />
                                        ) : (
                                            <div className="metrics-graph">
                                                <h4>Weekly Request Growth</h4>

                                                <LineGraph data={metrics.logs} />

                                                <div className="legends d-flex flex-column align-items-center justify-content-center">
                                                    <div className="d-flex align-items-center">
                                                        <span
                                                            style={{ backgroundColor: '#8884d8' }}
                                                        ></span>
                                                        <p>
                                                            This week:{' '}
                                                            {metrics.logs.week1.total_week} requests
                                                        </p>
                                                    </div>

                                                    <div className="d-flex align-items-center">
                                                        <span
                                                            style={{ backgroundColor: '#82ca9d' }}
                                                        ></span>
                                                        <p>
                                                            Last week:{' '}
                                                            {metrics.logs.week2.total_week} requests
                                                        </p>
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
