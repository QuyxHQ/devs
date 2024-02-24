import { useEffect, useState } from "react";
import { useAppStore } from "../../../context/AppProvider";
import { FormGroup, LoadingContentOnButton, Modal, VerifyEmailComponent } from "../../..";
import { ROLES, HEARD_US_FROM } from "../../../../utils/constants";
import { api } from "../../../../utils/class/api.class";
import { TbInfoHexagon } from "react-icons/tb";

const CompleteOnboarding = () => {
  const { userInfo } = useAppStore();

  const [role, setRole] = useState<string>("");
  const [heardUsFrom, setHeardUsFrom] = useState<string>("");
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      setRole(userInfo.role ?? "");
      setHeardUsFrom(userInfo.heardUsFrom ?? "");
    }
  }, [userInfo]);

  async function onboardDev(e: any) {
    e.preventDefault();
    if (isLoading || !userInfo) return;

    setIsLoading(true);

    const resp = await api.onboard({ heardUsFrom, role });
    if (resp) window.location.reload();

    setIsLoading(false);
  }

  return (
    <div className="complete-onboarding mb-4">
      <Modal
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        size="md"
        children={<VerifyEmailComponent close={setDisplayModal} />}
      />

      <h3 className="mb-4">
        <div>
          <TbInfoHexagon />
        </div>
        <span>Complete Onboarding</span>
      </h3>

      <div className="col-12 py-1">
        <div className="row align-items-center g-4">
          <div className="col-12 col-md-6 col-xl-4 mb-2 mb-md-0">
            <div className="email-verify">
              <div className="d-flex flex-column align-items-start">
                <div>
                  <p>Verify email address</p>
                  <h4>{userInfo?.email}</h4>
                </div>

                <button
                  onClick={
                    userInfo?.isEmailVerified ? undefined : () => setDisplayModal(true)
                  }
                  className={`verified-${userInfo?.isEmailVerified}`}
                >
                  {userInfo?.isEmailVerified ? "Verified" : "Verify"}
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-8">
            <div className="col-12">
              <form action="#" method="post" className="row g-4" onSubmit={onboardDev}>
                <div className="col-12 col-sm-5 col-md-12 col-xl-6">
                  <div>
                    <FormGroup
                      setter={setRole}
                      getter={role}
                      inputType="select"
                      label="Role"
                      options={[...ROLES.map((role) => ({ label: role, value: role }))]}
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-7 col-md-12 col-xl-6">
                  <div>
                    <FormGroup
                      setter={setHeardUsFrom}
                      getter={heardUsFrom}
                      inputType="select"
                      label="Heard us from"
                      options={[
                        ...HEARD_US_FROM.map((item) => ({
                          label: item,
                          value: item,
                        })),
                      ]}
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <button
                    className="btn blue"
                    style={{ width: "10rem" }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingContentOnButton /> : " Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOnboarding;
