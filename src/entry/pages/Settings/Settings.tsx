import { useEffect, useState } from "react";
import { ROLES } from "../../../utils/constants";
import { api } from "../../../utils/class/api.class";
import { FormGroup } from "../..";
import { useAppStore } from "../../context/AppProvider";
import { useNavigate } from "react-router";
import { dateUTC } from "../../../utils/helpers";

const Settings = () => {
  const { userInfo, metadata } = useAppStore();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (function () {
      if (!userInfo || !metadata) return;
      if (!userInfo.verifiedPasswordLastOn) return navigate("/sudo");

      if (
        dateUTC(userInfo.verifiedPasswordLastOn).getTime() + metadata.SUDO_TTL <
        dateUTC().getTime()
      ) {
        return navigate("/sudo");
      }
    })();
  }, [userInfo, metadata]);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
      setCompany(userInfo.company ?? "");
      setRole(userInfo.role ?? "");
    }
  }, [userInfo]);

  async function edit(e: any) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    const resp = await api.edit({
      email,
      firstName,
      lastName,
      company,
      role,
    });
    if (resp) window.location.reload();

    setIsLoading(false);
  }

  return (
    <section>
      <h1 className="page-title mb-4">Settings</h1>

      <form className="mb-5 pt-3" action="#" method="post" onSubmit={edit}>
        <div className="col-12">
          <div className="row g-4">
            <div className="col-12 col-xl-9">
              <div className="metrics-box">
                <div className="row g-4">
                  <div className="col-12 col-sm-6">
                    <FormGroup
                      getter={firstName}
                      setter={setFirstName}
                      label="First name"
                      inputType="text"
                      placeholder="e.g. John"
                      required
                    />
                  </div>

                  <div className="col-12 col-sm-6">
                    <FormGroup
                      getter={lastName}
                      setter={setLastName}
                      label="Last name"
                      inputType="text"
                      placeholder="e.g. Doe"
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <FormGroup
                      getter={email}
                      setter={setEmail}
                      label="Email address"
                      inputType="email"
                      placeholder="e.g. user@domain.ltd"
                      required
                    />
                  </div>

                  <div className="col-12 col-sm-6">
                    <FormGroup
                      getter={company}
                      setter={setCompany}
                      label="Company"
                      inputType="text"
                      placeholder="e.g. QuyxHQ"
                      readOnly
                    />
                  </div>

                  <div className="col-12 col-sm-6 col-md-12">
                    <FormGroup
                      getter={role}
                      setter={setRole}
                      label="Role"
                      inputType="select"
                      placeholder="--choose role--"
                      options={[...ROLES.map((role) => ({ label: role, value: role }))]}
                    />
                  </div>

                  <div className="col-12">
                    <button
                      className="btn blue"
                      style={{ width: "100%", maxWidth: "11rem" }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 d-none d-xl-block col-xl-3">
              <div className="extra-box" />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Settings;
