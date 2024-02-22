const LoadingContentOnButton = ({ text }: { text?: string }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ gap: "0.6rem" }}
    >
      <span>{text ? text : "Processing"}</span>
      <span className="loader-span"></span>
    </div>
  );
};

export default LoadingContentOnButton;
