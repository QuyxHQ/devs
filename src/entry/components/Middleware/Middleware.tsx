import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../context/AppProvider";
import { useEffect } from "react";
import { Layout } from "..";

const Middleware = ({ children }: { children: React.JSX.Element }) => {
  const navigate = useNavigate();
  const { isMounting, isLoggedIn } = useAppStore();

  const unprotectedRoutes = ["/login", "/get-started"];
  const outOfLayoutRoutes = [
    ...unprotectedRoutes,
    "/forgot-password",
    "/sudo",
    "/verify",
  ];

  useEffect(() => {
    (function () {
      if (!isMounting) {
        if (isLoggedIn && unprotectedRoutes.includes(location.pathname)) {
          navigate("/");
        }

        if (!isLoggedIn && !unprotectedRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      }
    })();
  }, [isMounting, isLoggedIn, navigate]);

  return isMounting ? (
    "Loading"
  ) : outOfLayoutRoutes.includes(location.pathname) ||
    location.pathname.substring(0, 15) == "/reset-password" ? (
    children
  ) : (
    <Layout children={children} />
  );
};

export default Middleware;
