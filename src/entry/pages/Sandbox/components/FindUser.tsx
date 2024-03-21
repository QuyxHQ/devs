import { useState } from "react";
import { FormGroup, LoadingContentOnButton } from "../../..";
import { useSandboxStore } from "../../../context/SandboxProvider";

const FindUser = () => {
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { sandboxSdk, setResponse } = useSandboxStore();

  async function findUserFn() {
    if (!sandboxSdk || isLoading || !query || query.length == 0) return;

    setIsLoading(true);

    const resp = await sandboxSdk.getSingleUser({ query });
    setResponse!(resp.data);
    setIsLoading(false);
  }

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      <div className="d-flex flex-column jusitify-content-center">
        <h3 className="head">Find User</h3>
        <p className="intro">
          Input an address or username to retrieve their info on your app
        </p>

        <div className="w-100">
          <FormGroup
            getter={query}
            setter={setQuery}
            label="Address or Username"
            placeholder="e.g. Solana wallet address or johnDoe"
            className="w-100 mb-3"
            displayLabel={false}
          />

          <button
            className="btn blue"
            style={{ width: "10rem" }}
            disabled={isLoading}
            onClick={findUserFn}
          >
            {isLoading ? <LoadingContentOnButton text="Searching.." /> : "Find"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindUser;
