import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../utils/class/api.class';
import { NotFound } from '..';
import { EmptyUsersIcon, LoadingComponent } from '../..';
import { TbChevronLeft, TbChevronRight, TbCopy } from 'react-icons/tb';
import { copyToClipboard, formatDate, truncateAddress } from '../../../utils/helpers';
import { AiOutlineQuestion } from 'react-icons/ai';
import settings from '../../../utils/settings';

const Users = () => {
    const { did } = useParams() as { did: string };

    const [space, setSpace] = useState<Space>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //# app users
    const [users, setUsers] = useState<QuyxSDKUser[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        (async function () {
            setIsLoading(true);

            const resp = await api.getSingleSpace({ did });
            if (resp) {
                setSpace(resp);
                getUsers(did);
            }
        })();
    }, [did]);

    async function getUsers(did: string) {
        const keys = await api.getSpaceKeys({ did });
        if (keys) {
            const { sk } = keys.keys.keys;

            const resp = await fetch(`${settings.ENDPOINT_URL}/identity`, {
                method: 'GET',
                headers: { 'quyx-sk': sk },
            });

            // {
            //     status: boolean;
            //     data: { page: number; limit: number; total: number; data: any[] };
            // }
            const { status, data } = await resp.json();

            if (status) {
                setUsers(data.data);
                setTotal(data.total);
            }
        }

        setIsLoading(false);
    }

    return isLoading ? (
        <LoadingComponent />
    ) : !space ? (
        <NotFound />
    ) : (
        <section>
            <h1 className="page-title mb-4 pb-2">
                {space.name} &raquo; <span>Users</span>
            </h1>

            {users.length == 0 ? (
                <div className="error-div px-3">
                    <EmptyUsersIcon />

                    <h3>Empty result</h3>
                    <p>no user found</p>
                </div>
            ) : (
                <>
                    <div className="table-responsive my-2">
                        <table className="user-tbl">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Card Info</th>
                                    <th>Address</th>
                                    <th>Created on</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={`table-row-${index}-${user._id}`}>
                                        <td>
                                            {' '}
                                            {page == 1 ? 1 + index : limit * (page - 1) + index + 1}
                                        </td>
                                        <td>
                                            {user.card ? (
                                                <div className="user-info">
                                                    <img
                                                        src={user.card.pfp}
                                                        alt={user.card.username}
                                                    />
                                                    <p>{user.card.username}</p>
                                                </div>
                                            ) : (
                                                <div className="user-info">
                                                    <div className="icon">
                                                        <AiOutlineQuestion />
                                                    </div>
                                                    <p>--n/a--</p>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="address">
                                                <span>{truncateAddress(user.address)}</span>
                                                <div onClick={() => copyToClipboard(user.address)}>
                                                    <TbCopy />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{formatDate(user.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex align-items-center justify-content-end pagination">
                        <div className="d-flex align-items-center first">
                            <p>Rows per page:</p>

                            <select
                                onChange={(e) => setLimit(parseInt(e.target.value))}
                                value={limit}
                            >
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
                                    page >= Math.ceil(total / limit)
                                        ? () => {}
                                        : () => setPage(page + 1)
                                }
                            >
                                <TbChevronRight />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Users;
