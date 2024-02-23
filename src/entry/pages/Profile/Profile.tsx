import { TbAlertTriangle, TbPencil } from "react-icons/tb";
import { useAppStore } from "../../context/AppProvider";
import { AnchorLink, Modal } from "../..";
import { useState } from "react";
import { ResetPassword } from "./components";

const Profile = () => {
  const { userInfo } = useAppStore();

  const [displayModal, setDisplayModal] = useState<boolean>(false);

  return (
    <section>
      <Modal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        children={<ResetPassword close={setDisplayModal} />}
      />

      <h1 className="page-title mb-4">Profile</h1>

      <div className="profile-card mb-4">
        <div className="single-info">
          <p>Full name</p>
          <div>
            <h4 className="title-case">
              {userInfo?.firstName} {userInfo?.lastName}
            </h4>

            <div className="icons">
              <AnchorLink to="/sudo">
                <TbPencil />
              </AnchorLink>
            </div>
          </div>
        </div>

        <div className="single-info">
          <p>Email address</p>
          <div>
            <h4>{userInfo?.email}</h4>

            <div className="icons">
              {userInfo?.isEmailVerified ? null : (
                <AnchorLink to="/verify" className="warning">
                  <TbAlertTriangle
                    onClick={() => setDisplayModal(true)}
                    stroke="crimson"
                    title="Verify email address"
                  />
                </AnchorLink>
              )}

              <AnchorLink to="/sudo">
                <TbPencil />
              </AnchorLink>
            </div>
          </div>
        </div>

        <div className="single-info">
          <p>Company</p>
          <div>
            <h4>{userInfo?.company}</h4>

            <div className="icons">
              <AnchorLink to="/sudo">
                <TbPencil />
              </AnchorLink>
            </div>
          </div>
        </div>

        <div className="single-info">
          <p>Role</p>
          <div>
            <h4>{userInfo?.role ?? "n/a"}</h4>

            <div className="icons">
              <AnchorLink to="/sudo">
                <TbPencil />
              </AnchorLink>
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn border mb-5"
        style={{ width: "100%", maxWidth: "11rem" }}
        type="button"
        onClick={() => setDisplayModal(true)}
      >
        Reset Password
      </button>
    </section>
  );
};

export default Profile;
