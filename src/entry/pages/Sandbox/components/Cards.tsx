import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { FormGroup, LoadingContentOnButton } from "../../..";
import { useSandboxStore } from "../../../context/SandboxProvider";
import { TOAST_STATUS, customToast } from "../../../../utils/toast.utils";

const Cards = () => {
  const [address, setAddress] = useState<string>("");
  const [page, setPage] = useState<string>("1");
  const [limit, setLimit] = useState<string>("10");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { publicKey } = useWallet();
  const { sandboxSdk, setResponse } = useSandboxStore();

  useEffect(() => setAddress(publicKey?.toBase58() || ""), [publicKey]);

  async function getCurrentUserCards() {
    if (!sandboxSdk || isLoading) return;

    if (isNaN(parseInt(page))) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: "`page` should be a number & defined",
      });

      return;
    }

    if (isNaN(parseInt(limit))) {
      customToast({
        type: TOAST_STATUS.ERROR,
        message: "`limit` should be a number & defined",
      });

      return;
    }

    setIsLoading(true);

    const resp = await sandboxSdk.getUserCards({
      page: parseInt(page),
      limit: parseInt(limit),
    });

    setResponse!(resp);
    setIsLoading(false);
  }

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      <div className="d-flex flex-column jusitify-content-center">
        <h3 className="head">User Cards</h3>
        <p className="intro">Retrieves cards of user across all chains on quyx</p>

        <div className="w-100">
          <FormGroup
            getter={address}
            setter={setAddress}
            label="Address"
            readOnly
            className="w-100 mt-1 mb-4"
            displayLabel={false}
          />

          <FormGroup
            getter={page}
            setter={setPage}
            label="Page number"
            className="w-100 mb-4"
            inputType="number"
            placeholder="e.g. 1,2,3,4,...."
          />

          <FormGroup
            getter={limit}
            setter={setLimit}
            label="Limit (number of cards per page)"
            className="w-100 mb-4"
            inputType="number"
            placeholder="e.g. 1,2,3,4,...."
          />
        </div>

        <button
          className="btn blue"
          style={{ width: "11rem" }}
          disabled={isLoading}
          onClick={getCurrentUserCards}
        >
          {isLoading ? <LoadingContentOnButton text="Querying.." /> : "Query"}
        </button>
      </div>
    </div>
  );
};

export default Cards;
