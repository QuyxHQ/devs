import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";
import {
  AIChat,
  AppsList,
  Dashboard,
  ForgotPassword,
  Login,
  Middleware,
  NotFound,
  Profile,
  Register,
  ResetPassword,
  Sandbox,
  SdkLogs,
  Settings,
  SingleApp,
  Sudo,
  Users,
  VerifyEmail,
} from "./entry";
import { Toaster } from "react-hot-toast";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Middleware children={<Dashboard />} />,
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Middleware children={<Login />} />,
    },
    {
      path: "/get-started",
      element: <Middleware children={<Register />} />,
    },
    {
      path: "/verify",
      element: <Middleware children={<VerifyEmail />} />,
    },
    {
      path: "/forgot-password",
      element: <Middleware children={<ForgotPassword />} />,
    },
    {
      path: "/reset-password/:hash",
      element: <Middleware children={<ResetPassword />} />,
    },
    {
      path: "/chat-ai",
      element: <Middleware children={<AIChat />} />,
    },
    {
      path: "/apps",
      element: <Middleware children={<AppsList />} />,
    },
    {
      path: "/profile",
      element: <Middleware children={<Profile />} />,
    },
    {
      path: "/sandbox",
      element: <Middleware children={<Sandbox />} />,
    },
    {
      path: "/logs",
      element: <Middleware children={<SdkLogs />} />,
    },
    {
      path: "/settings",
      element: <Middleware children={<Settings />} />,
    },
    {
      path: "/app/:app",
      element: <Middleware children={<SingleApp />} />,
    },
    {
      path: "/app/users/:app",
      element: <Middleware children={<Users />} />,
    },
    {
      path: "/sudo",
      element: <Middleware children={<Sudo />} />,
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
