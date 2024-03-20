import { useEffect, useState } from "react";
import { useSandboxStore } from "../../../context/SandboxProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { FormGroup, LoadingContentOnButton } from "../../..";

const Current = () => {
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { publicKey } = useWallet();
  const { sandboxSdk, setResponse } = useSandboxStore();

  useEffect(() => setAddress(publicKey?.toBase58() || ""), [publicKey]);

  async function getCurrentUser() {
    if (!sandboxSdk || isLoading) return;
    setIsLoading(true);

    const resp = await sandboxSdk.currentSdkUser();
    setResponse!(resp.data);

    setIsLoading(false);
  }

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      <div className="d-flex flex-column jusitify-content-center">
        <h3 className="head">User Info</h3>
        <p className="intro">Retrieves info about the logged in user</p>

        <div className="w-100">
          <FormGroup
            getter={address}
            setter={setAddress}
            label="Address"
            readOnly
            className="w-100 mb-4"
            displayLabel={false}
          />
        </div>

        <button
          className="btn blue"
          style={{ width: "11rem" }}
          disabled={isLoading}
          onClick={getCurrentUser}
        >
          {isLoading ? <LoadingContentOnButton text="Querying.." /> : "Query"}
        </button>
      </div>
    </div>
  );
};

export default Current;
