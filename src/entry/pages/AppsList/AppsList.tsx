import { useEffect, useState } from "react";
import { api } from "../../../utils/class/api.class";
import { LoadingComponent } from "../..";
import { EmptyResult, RenderTable } from "./components";
import { useAppStore } from "../../context/AppProvider";

const AppsList = () => {
  const { shouldRefresh } = useAppStore();

  const [apps, setApps] = useState<QuyxApp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    (async function () {
      setIsLoading(true);

      const resp = await api.getAllApps({ page, limit });
      if (resp.status) {
        setApps(resp.data as QuyxApp[]);
        setTotal(resp.pagination.total);
        setIsLoading(false);
      }
    })();
  }, [limit, page, shouldRefresh]);

  return (
    <section>
      <h1 className="page-title mb-4">Apps</h1>

      <div className="col-12">
        {isLoading ? (
          <LoadingComponent />
        ) : apps.length == 0 ? (
          <EmptyResult />
        ) : (
          <RenderTable
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            total={total}
            data={apps}
          />
        )}
      </div>
    </section>
  );
};

export default AppsList;
