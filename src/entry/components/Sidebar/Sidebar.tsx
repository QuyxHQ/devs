import {
  TbApps,
  TbBox,
  TbFile,
  TbHome2,
  TbLogout,
  TbRobot,
  TbSettings,
  TbUser,
  TbWriting,
} from "react-icons/tb";
import { AnchorLink, LoadingContentOnButton, Logo } from "..";
import { useAppStore } from "../../context/AppProvider";
import { useState } from "react";
import { api } from "../../../utils/class/api.class";

const Sidebar = () => {
  const { userInfo } = useAppStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function logout() {
    if (isLoading) return;
    if (!confirm("Are you sure you want to logout?")) return;

    setIsLoading(true);
    const resp = await api.logout();
    if (resp) window.location.href = "/login";

    setIsLoading(false);
  }

  const navigation = [
    {
      to: "/",
      title: "Home",
      icon: <TbHome2 />,
    },
    {
      to: "/apps",
      match: "/app",
      title: "Apps",
      icon: <TbApps />,
    },
    {
      to: "/logs",
      title: "Logs",
      icon: <TbWriting />,
    },
    {
      to: "/sandbox",
      title: "Sandbox",
      icon: <TbBox />,
    },
    {
      to: "/chat-ai",
      title: "AI Chat",
      icon: <TbRobot />,
    },
    {
      to: "/profile",
      title: "Profile",
      icon: <TbUser />,
    },
    {
      to: "/settings",
      title: "Settings",
      icon: <TbSettings />,
    },
    {
      to: "//docs.quyx.xyz",
      title: "Documentation",
      icon: <TbFile />,
    },
    {
      to: "#",
      title: "Logout",
      icon: <TbLogout />,
      fn: logout,
    },
  ];

  return (
    <div className="sidebar-content">
      <AnchorLink to="/" className="d-block mb-2 mt-3 mb-md-4 mb-lg-2">
        <div className="d-flex align-items-center pt-3 pb-1 ps-2 px-md-0 ps-lg2 justify-content-center brand">
          <Logo fill="#fff" width={35} height={35} />
          <span className="d-md-none d-lg-block">uyx</span>
        </div>
      </AnchorLink>

      <div className="d-md-none d-lg-flex my-3 p-3 py-4 info">
        <h4 className="title-case">
          {`${userInfo?.firstName} ${userInfo?.lastName.charAt(0)}.`}
        </h4>
        <p>{userInfo?.role ?? "n/a"}</p>
      </div>

      <ul>
        {navigation.map((item, i) => (
          <li
            className={
              location.pathname == item.to ||
              location.pathname.substring(0, item.match?.length) == item.match
                ? "active"
                : ""
            }
            key={`navigation-${i}`}
            onClick={item.fn}
          >
            <AnchorLink to={item.to}>
              {item.icon}

              <span className="d-md-none d-lg-block">
                {isLoading && item.fn ? (
                  <LoadingContentOnButton text="hang on.." />
                ) : (
                  item.title
                )}
              </span>
            </AnchorLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
