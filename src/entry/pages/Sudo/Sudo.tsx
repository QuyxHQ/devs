import { useEffect, useState } from "react";
import { Logo, FormGroup, AnchorLink, LoadingContentOnButton } from "../..";
import { api } from "../../../utils/class/api.class";
import { useAppStore } from "../../context/AppProvider";
import { useNavigate } from "react-router-dom";

const Sudo = () => {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userInfo, metadata } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    (function () {
      if (!userInfo || !metadata) return;
      if (!userInfo.verifiedPasswordLastOn) return;
      if (
        new Date(userInfo.verifiedPasswordLastOn).getTime() + metadata.SUDO_TTL >
        Date.now()
      ) {
        return navigate("/settings");
      }
    })();
  }, [userInfo, metadata]);

  async function sudo(e: any) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    const resp = await api.sudo({ password });
    if (resp) window.location.href = "/settings";

    setIsLoading(false);
  }

  return (
    <section className="form-body d-flex flex-column align-items-center">
      <Logo width={50} height={50} />

      <form className="form-container py-5 px-4" onSubmit={sudo}>
        <div className="mb-4">
          <h1>Confirm access</h1>
          <p className="intro"></p>
        </div>

        <FormGroup
          className="mb-4"
          getter={password}
          setter={setPassword}
          label="Password"
          inputType="password"
          placeholder="e.g. ********"
          required
          isPasswordField
        />

        <button className="btn mb-4" type="submit" disabled={isLoading}>
          {isLoading ? <LoadingContentOnButton /> : "Confirm password"}
        </button>

        <AnchorLink
          to="/"
          className="d-block link-in-form mb-0 pb-0"
          style={{ textAlign: "center" }}
        >
          <p className="mb-0 pb-0">Back to Dashboard</p>
        </AnchorLink>
      </form>

      <div className="extra">
        <p>why is this even necessary?</p>
        <AnchorLink to="/">
          <span>Learn more</span>
        </AnchorLink>
      </div>
    </section>
  );
};

export default Sudo;
