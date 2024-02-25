import { TbAlertTriangle, TbPencil } from "react-icons/tb";
import { useAppStore } from "../../context/AppProvider";
import { AnchorLink, Modal, VerifyEmailComponent } from "../..";
import { useState } from "react";
import { ResetPassword } from "./components";

const Profile = () => {
  const { userInfo } = useAppStore();

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [size, setSize] = useState<"md" | "lg">("lg");
  const [modalBody, setModalBody] = useState<React.JSX.Element>();

  return (
    <section>
      <Modal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        size={size}
        children={modalBody}
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
              <AnchorLink to="/settings">
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
                <TbAlertTriangle
                  onClick={() => {
                    setSize("md");
                    setModalBody(<VerifyEmailComponent close={setDisplayModal} />);
                    setDisplayModal(true);
                  }}
                  stroke="crimson"
                  className="pointer"
                  title="Verify email address"
                />
              )}

              <AnchorLink to="/settings">
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
              <AnchorLink to="/settings">
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
              <AnchorLink to="/settings">
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
        onClick={() => {
          setSize("lg");
          setModalBody(<ResetPassword close={setDisplayModal} />);
          setDisplayModal(true);
        }}
      >
        Reset Password
      </button>
    </section>
  );
};

export default Profile;
