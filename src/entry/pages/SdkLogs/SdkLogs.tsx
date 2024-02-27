import { useState, useEffect } from "react";
import { api } from "../../../utils/class/api.class";
import { EmptyLogIcon, LoadingComponent } from "../..";
import { RenderLogs } from "./components";

const SdkLogs = () => {
  const [logs, setLogs] = useState<QuyxLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    (async function () {
      setIsLoading(true);

      const resp = await api.getLogs({ page, limit });
      if (!resp.status) return;

      setLogs(resp.data);
      setTotal(resp.pagination.total);
      setIsLoading(false);
    })();
  }, [limit, page]);

  return (
    <section>
      <h1 className="page-title mb-4">Logs</h1>

      <div className="col-12">
        {isLoading ? (
          <LoadingComponent />
        ) : logs.length == 0 ? (
          <div className="error-div">
            <EmptyLogIcon className="mb-0" />

            <h3>no logs yet!</h3>
          </div>
        ) : (
          <div>
            <RenderLogs
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              total={total}
              data={logs}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default SdkLogs;
