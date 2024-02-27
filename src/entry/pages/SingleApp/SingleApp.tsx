import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../utils/class/api.class";
import { AnchorLink, LoadingComponent, Modal, NotFound } from "../..";
import { RenderMetrics, ViewKeys } from "./components";
import { TbArrowLeft, TbDotsVertical, TbKey } from "react-icons/tb";
import { AppEditModal } from "../AppsList/components";
import { RenderLogs } from "../SdkLogs/components";

const SingleApp = () => {
  const { app: id } = useParams() as { app: string };

  const [app, setApp] = useState<QuyxApp>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //# app metrics
  const [metrics, setMetrics] = useState<AppMetrics>();

  //# app logs
  const [logs, setLogs] = useState<QuyxLog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  //# for modal
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [modalBody, setModalBody] = useState<React.JSX.Element>();

  useEffect(() => {
    (async function () {
      setIsLoading(true);

      const resp = await api.getSingleApp({ app: id });
      if (resp) {
        setApp(resp);

        getMetrics(resp._id);
        getLogs(resp._id);
      }
    })();
  }, [id]);

  async function getLogs(app: string) {
    const resp = await api.getAppLogs({ app, limit, page });
    if (resp.status) {
      setLogs(resp.data);
      setTotal(resp.pagination.total);
    }

    setIsLoading(false);
  }

  async function getMetrics(app: string) {
    const resp = await api.getAppMetrics({ app });
    if (resp.status) setMetrics(resp.data);
  }

  return isLoading ? (
    <LoadingComponent />
  ) : !app ? (
    <NotFound />
  ) : (
    <div>
      <Modal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        children={modalBody}
      />

      <div className="py-4 single-app-title">
        <AnchorLink to="/apps" className="d-flex align-items-center back mb-4">
          <TbArrowLeft />
          <span>apps</span>
        </AnchorLink>

        <div className="d-flex align-items-center justify-content-between py-2">
          <h2>{app.name}</h2>

          <div className="buttons d-flex align-items-center">
            <button
              onClick={() => {
                setModalBody(
                  <ViewKeys
                    apiKey={app.apiKey}
                    clientID={app.clientID}
                    close={setDisplayModal}
                  />
                );
                setDisplayModal(true);
              }}
            >
              <TbKey />
              <span>Keys</span>
            </button>

            <button
              onClick={() => {
                setModalBody(<AppEditModal data={app} close={setDisplayModal} />);
                setDisplayModal(true);
              }}
            >
              <TbDotsVertical />
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 mb-5">
        <RenderMetrics data={metrics} app={app._id} />
      </div>

      <div className="col-12 mb-4">
        <div className="text-and-hr d-flex align-items-center mb-4">
          <hr />
          <h2>Logs ({total})</h2>
        </div>

        {isLoading ? (
          <LoadingComponent />
        ) : (
          <RenderLogs
            data={logs}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            total={total}
          />
        )}
      </div>
    </div>
  );
};

export default SingleApp;
