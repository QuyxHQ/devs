import { useState } from "react";
import { useSandboxStore } from "../../../context/SandboxProvider";
import { LoadingContentOnButton } from "../../..";
import { TbAlertHexagon } from "react-icons/tb";

const DeleteAccount = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sandboxSdk, setResponse, setTokens } = useSandboxStore();

  async function logout() {
    if (!sandboxSdk || isLoading) return;
    if (
      !confirm(
        "Are you sure you want to delete your account on this app?\n\nNB: This action is irreversible"
      )
    )
      return;
    setIsLoading(true);

    const resp = await sandboxSdk.disconnect();
    if (!resp.error) setTokens!(undefined);
    setResponse!(resp.data);

    setIsLoading(false);
  }

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      <div className="d-flex flex-column jusitify-content-center">
        <div className="warning d-flex align-items-center">
          <TbAlertHexagon size={19} />
          <p>Danger zone</p>
        </div>

        <h3 className="head">Delete Account</h3>
        <p className="intro">
          This <span style={{ color: "red" }}>deletes</span> your current account on this
          application, kindly beware of the consequences before you proceed
        </p>

        <button
          className="btn danger"
          style={{ width: "11rem" }}
          disabled={isLoading}
          onClick={logout}
        >
          {isLoading ? <LoadingContentOnButton /> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
