const LoadingComponent = () => {
  return (
    <div className="py-5 my-5 d-flex align-items-center justify-content-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="loader-svg"
        viewBox="0 0 340 340"
      >
        <circle cx="170" cy="170" r="160" stroke="#E2007C"></circle>
        <circle cx="170" cy="170" r="135" stroke="#404041"></circle>
        <circle cx="170" cy="170" r="110" stroke="#E2007C"></circle>
        <circle cx="170" cy="170" r="85" stroke="#404041"></circle>
      </svg>
    </div>
  );
};

export default LoadingComponent;
