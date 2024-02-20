const LoadingContentOnButton = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ gap: "0.8rem" }}
    >
      <span>Processing</span>
      <span className="loader-span"></span>
    </div>
  );
};

export default LoadingContentOnButton;
