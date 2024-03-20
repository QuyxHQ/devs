import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { customToast, TOAST_STATUS } from "../../../utils/toast.utils";

const OAuthError = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const provider = params.get("provider");
    const message = params.get("message");

    customToast({
      type: TOAST_STATUS.ERROR,
      message: `OAuth Provider: ${provider}\nError Message: ${message}`,
    });

    navigate("/login");
  }, [location]);

  return null;
};

export default OAuthError;
