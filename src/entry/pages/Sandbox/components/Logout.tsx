import { useState } from "react";
import { useSandboxStore } from "../../../context/SandboxProvider";
import { LoadingContentOnButton } from "../../..";
import { TOAST_STATUS, customToast } from "../../../../utils/toast.utils";

const Logout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sandboxSdk, setResponse, setTokens } = useSandboxStore();

  async function logout() {
    if (!sandboxSdk || isLoading) return;
    if (!confirm("Are you sure you want to logout from sandbox?")) return;
    setIsLoading(true);

    const resp = await sandboxSdk.logout();

    if (resp.error) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: resp.data.message ?? "Unable to complete request",
      });

      setResponse!(resp.data);
    } else {
      customToast({
        type: TOAST_STATUS.SUCCESS,
        message: resp.data.message ?? "logged out successfully!",
      });

      setTokens!(undefined);
      setResponse!({});
    }

    setIsLoading(false);
  }

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      <div className="d-flex flex-column jusitify-content-center">
        <h3 className="head">Logout?</h3>
        <p className="intro">
          Destroys current session, strongly advised to do so if you are done with the
          sandbox
        </p>

        <button
          className="btn"
          style={{ width: "11rem" }}
          disabled={isLoading}
          onClick={logout}
        >
          {isLoading ? <LoadingContentOnButton /> : "yes, logout"}
        </button>
      </div>
    </div>
  );
};

export default Logout;
