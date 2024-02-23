//@ts-ignore
const RenderLog = ({
  limit,
  setLimit,
  page,
  setPage,
  total,
  data,
  status,
  setStatus,
}: RenderTableProps<QuyxLog> & {
  status?: "failed" | "successful";
  setStatus: React.Dispatch<React.SetStateAction<"failed" | "successful" | undefined>>;
}) => {
  return <div></div>;
};

export default RenderLog;
