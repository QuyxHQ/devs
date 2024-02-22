import { Loader } from "..";

const LoadingComponent = () => {
  return (
    <div className="py-5">
      <Loader className="mx-auto my-5" fill="#aaa" width={28} height={28} />
    </div>
  );
};

export default LoadingComponent;
