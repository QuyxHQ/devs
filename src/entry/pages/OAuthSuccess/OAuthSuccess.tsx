import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OAuthSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("quyx_dev_access_token", accessToken);
      localStorage.setItem("quyx_dev_refresh_token", refreshToken);
    }

    window.location.href = "/";
  }, [location]);

  return null;
};

export default OAuthSuccess;
