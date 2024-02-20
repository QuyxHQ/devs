import { TbMenu2, TbBrandGithub, TbSearch, TbSlash } from "react-icons/tb";
import { AnchorLink, Logo } from "..";
import { useAppStore } from "../../context/AppProvider";
import { getInitials } from "../../../utils/helpers";

const Navbar = ({ setDisplaySidebar }: LayoutDependantsProps) => {
  const { userInfo } = useAppStore();

  return (
    <>
      <div className="info-bar">
        <p className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
          <span className="d-flex align-items-center">
            <span className="tag">BETA</span>
            <span>Tell us what you feel abouy Quyx!</span>
          </span>
          <a href="https://google.com" target="_blank">
            Fill out this form.
          </a>
        </p>
      </div>

      <nav className="navbar d-flex align-items-center justify-content-between">
        <div className="d-flex brand align-items-center d-md-none">
          <TbMenu2
            onClick={() => setDisplaySidebar(true)}
            size={24}
            className="pointer"
            stroke="#555"
            strokeWidth={1.7}
          />

          <AnchorLink to="/">
            <Logo width={35} height={35} fill="#bbb" />
          </AnchorLink>
        </div>

        <div className="d-none d-md-flex nav-search position-relative">
          <TbSearch size={20} strokeWidth={1.5} className="search position-absolute" />
          <input type="text" placeholder="Search" />
          <div className="slash position-absolute">
            <TbSlash size={20} />
          </div>
        </div>

        <div className="d-flex align-items-center nav-right">
          <div className="d-flex d-md-none">
            <TbSearch size={22} />
          </div>

          <a href="https://github.com/QuyxHQ" target="_blank">
            <div className="d-flex align-items-center github px-md-2">
              <TbBrandGithub size={22} />
              <span className="d-none d-md-block">Github</span>
            </div>
          </a>

          <AnchorLink to="/profile">
            <div className="profile-circle">
              <p>{getInitials(`${userInfo?.firstName} ${userInfo?.lastName}`)}</p>
            </div>
          </AnchorLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
