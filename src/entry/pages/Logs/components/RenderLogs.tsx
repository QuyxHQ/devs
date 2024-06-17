import { formatDistanceToNow, parseISO } from 'date-fns';
import { TbCheck, TbChevronLeft, TbChevronRight, TbX } from 'react-icons/tb';
import ReactJson from 'react-json-view';

const RenderLogs = ({ limit, setLimit, page, setPage, total, data }: RenderTableProps<Log>) => {
    return (
        <div>
            <div className="table-responsive">
                <table className="log-tbl">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Route</th>
                            <th>App</th>
                            <th>Status</th>
                            <th>Response Time</th>
                            <th>Log</th>
                            <th>Sent</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={`table-row-${index}-${item._id}`}>
                                <td>{page == 1 ? 1 + index : limit * (page - 1) + index + 1}</td>
                                <td>
                                    <strong className="route">{item.action}</strong>
                                </td>
                                <td>{item.space.isActive ? item.space.name : 'Deleted Space'}</td>
                                <td>
                                    <div className={`stat ${item.status}`}>
                                        {item.status == 'successful' ? <TbCheck /> : <TbX />}
                                        <span>{item.status}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className="green">{item.response_time}ms</span>
                                </td>
                                <td>
                                    <div className="log">
                                        {item.log ? (
                                            <ReactJson
                                                src={JSON.parse(item.log)}
                                                name={null}
                                                indentWidth={5}
                                                enableClipboard={false}
                                                displayObjectSize={false}
                                                displayDataTypes={false}
                                                collapsed
                                            />
                                        ) : (
                                            'null'
                                        )}
                                    </div>
                                </td>
                                <td>{formatDistanceToNow(parseISO(item.createdAt))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex align-items-center justify-content-end pagination">
                <div className="d-flex align-items-center first">
                    <p>Rows per page:</p>

                    <select onChange={(e) => setLimit(parseInt(e.target.value))} value={limit}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>

                <div className="paging">
                    {page == 1 ? page : (page - 1) * limit + 1}&nbsp;-&nbsp;
                    {total < limit ? total : page == 1 ? limit : limit * (page - 1) + limit}
                    &nbsp;of&nbsp;{total}
                </div>

                <div className="d-flex align-items-center chevron">
                    <div
                        className={page <= 1 ? 'disabled' : ''}
                        onClick={page <= 1 ? () => {} : () => setPage(page - 1)}
                    >
                        <TbChevronLeft />
                    </div>

                    <div
                        className={page >= Math.ceil(total / limit) ? 'disabled' : ''}
                        onClick={
                            page >= Math.ceil(total / limit) ? () => {} : () => setPage(page + 1)
                        }
                    >
                        <TbChevronRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenderLogs;
