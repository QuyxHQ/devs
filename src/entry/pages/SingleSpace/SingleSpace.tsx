import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../utils/class/api.class';
import { AnchorLink, EmptyLogIcon, LoadingComponent, Modal, NotFound } from '../..';
import { RenderMetrics, ViewKeys } from './components';
import { TbArrowLeft, TbDotsVertical, TbKey } from 'react-icons/tb';
import { SpaceEditModal } from '../Spaces/components';
import { RenderLogs } from '../Logs/components';

const SingleSpace = () => {
    const { did } = useParams() as { did: string };

    const [space, setSpace] = useState<Space>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    //# app metrics
    const [metrics, setMetrics] = useState<SpaceMetrics>();

    //# app logs
    const [logs, setLogs] = useState<Log[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);

    //# for modal
    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const [modalBody, setModalBody] = useState<React.JSX.Element>();

    const [keys, setKeys] = useState<{ pk: string; sk: string }>();

    useEffect(() => {
        (async function () {
            setIsLoading(true);

            const [keys, resp] = await Promise.all([
                api.getSpaceKeys({ did }),
                api.getSingleSpace({ did }),
            ]);

            setKeys(keys?.keys.keys);

            if (resp) {
                setSpace(resp);

                getMetrics(resp._id);
                getLogs(resp._id);
            }
        })();
    }, [did]);

    useEffect(() => {
        if (!space) return;
        getLogs(space._id);
    }, [space, page, limit]);

    async function getLogs(space: string) {
        const resp = await api.getSpaceLogs({ space, limit, page });

        setLogs(resp.response);
        setTotal(resp.total);

        setIsLoading(false);
    }

    async function getMetrics(space: string) {
        const resp = await api.getSpaceMetrics({ space });
        setMetrics(resp);
    }

    return isLoading ? (
        <LoadingComponent />
    ) : !space ? (
        <NotFound />
    ) : (
        <div>
            <Modal
                displayModal={displayModal}
                setDisplayModal={setDisplayModal}
                children={modalBody}
                size="md"
            />

            <div className="py-4 single-app-title">
                <AnchorLink to="/spaces" className="d-flex align-items-center back mb-4">
                    <TbArrowLeft />
                    <span>Spaces</span>
                </AnchorLink>

                <div className="d-flex align-items-center justify-content-between py-2">
                    <h2>{space.name}</h2>

                    <div className="buttons d-flex align-items-center">
                        <button
                            onClick={() => {
                                setModalBody(<ViewKeys keys={keys!} close={setDisplayModal} />);
                                setDisplayModal(true);
                            }}
                        >
                            <TbKey />
                            <span>Keys</span>
                        </button>

                        <button
                            onClick={() => {
                                setModalBody(
                                    <SpaceEditModal data={space} close={setDisplayModal} />
                                );
                                setDisplayModal(true);
                            }}
                        >
                            <TbDotsVertical />
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-12 mb-5">
                <RenderMetrics data={metrics} did={space.did} />
            </div>

            <div className="col-12 mb-4">
                {logs.length == 0 ? (
                    <div className="error-div">
                        <EmptyLogIcon />
                    </div>
                ) : (
                    <>
                        <div className="text-and-hr d-flex align-items-center mb-4">
                            <hr />
                            <h2>Logs ({total})</h2>
                        </div>

                        <RenderLogs
                            data={logs}
                            limit={limit}
                            setLimit={setLimit}
                            page={page}
                            setPage={setPage}
                            total={total}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default SingleSpace;
