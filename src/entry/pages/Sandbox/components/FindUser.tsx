import { useState } from "react";
import { FormGroup, LoadingContentOnButton } from "../../..";
import { useSandboxStore } from "../../../context/SandboxProvider";

const FindUser = () => {
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sandboxSdk, setResponse } = useSandboxStore();

  async function findUserFromAddress() {
    if (!sandboxSdk || isLoading || !address || address.length == 0) return;

    setIsLoading(true);

    const resp = await sandboxSdk.getSingleUser({ address });
    setResponse!(resp.data);
    setIsLoading(false);
  }

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      <div className="d-flex flex-column jusitify-content-center">
        <h3 className="head">Find User</h3>
        <p className="intro">
          Input an address and get to retrieve their info on your app
        </p>

        <div className="w-100">
          <FormGroup
            getter={address}
            setter={setAddress}
            label="Address"
            placeholder="e.g. Solana wallet addres...."
            className="w-100 mb-3"
            displayLabel={false}
          />

          <button
            className="btn blue"
            style={{ width: "10rem" }}
            disabled={isLoading}
            onClick={findUserFromAddress}
          >
            {isLoading ? <LoadingContentOnButton text="Searching.." /> : "Find"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindUser;
