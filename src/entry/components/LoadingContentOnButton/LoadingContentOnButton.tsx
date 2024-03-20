const LoadingContentOnButton = ({ text, color }: { text?: string; color?: string }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ gap: "0.6rem" }}
    >
      <span>{text ? text : "Processing"}</span>
      <span className="loader-span" style={{ borderTopColor: color || "#fff" }} />
    </div>
  );
};

export default LoadingContentOnButton;
