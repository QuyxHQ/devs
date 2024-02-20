import {
  TbApps,
  TbBox,
  TbFile,
  TbHome2,
  TbRobot,
  TbSettings,
  TbUser,
  TbWriting,
} from "react-icons/tb";
import { AnchorLink, Logo } from "..";
import { useAppStore } from "../../context/AppProvider";

const Sidebar = () => {
  const { userInfo } = useAppStore();

  const navigation = [
    {
      to: "/",
      title: "Home",
      icon: <TbHome2 />,
    },
    {
      to: "/apps",
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
      title: "AI Help",
      icon: <TbRobot />,
    },
    {
      to: "https://docs.quyx.io",
      title: "Documentation",
      icon: <TbFile />,
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
  ];

  return (
    <div className="sidebar-content">
      <AnchorLink to="/" className="d-block mb-2 mt-3">
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
            className={location.pathname == item.to ? "active" : ""}
            key={`navigation-${i}`}
          >
            <AnchorLink to={item.to}>
              {item.icon}
              <span className="d-md-none d-lg-block">{item.title}</span>
            </AnchorLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
