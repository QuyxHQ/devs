import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { FormGroup, LoadingContentOnButton } from "../../..";
import { useSandboxStore } from "../../../context/SandboxProvider";
import settings from "../../../../utils/settings";

const Import = () => {
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("Fetching..");
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [card, setCard] = useState<string>("");

  const { publicKey } = useWallet();
  const { sandboxSdk, setResponse } = useSandboxStore();

  useEffect(() => setAddress(publicKey?.toBase58() || ""), [publicKey]);

  useEffect(() => {
    (async function () {
      if (!sandboxSdk) return;

      setIsLoading(true);
      setLoadingText("Fetching..");

      const resp = await sandboxSdk.getUserCards({ page: 1, limit: 1000 });
      if (resp.status && resp.data && resp.data.length > 0) {
        const _options: { label: string; value: string }[] = [];
        resp.data.map((item) =>
          _options.push({
            label: `${item.username} (CHAIN ID: ${item.chainId})`,
            value: item._id,
          })
        );

        setOptions(_options);
      }

      setIsLoading(false);
    })();
  }, []);

  async function importCard() {
    if (!sandboxSdk || isLoading || !card || card.length == 0) return;
    setLoadingText("Processing");
    setIsLoading(true);

    const resp = await sandboxSdk.changeImportedCard({ card });
    setResponse!(resp.data);
    setIsLoading(false);
  }

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      <div className="d-flex flex-column jusitify-content-center">
        <h3 className="head">Import Card</h3>
        <p className="intro">Updates the user selected card preference</p>

        <div className="w-100">
          <FormGroup
            getter={address}
            setter={setAddress}
            label="Address"
            readOnly
            className="w-100 mb-4"
            displayLabel={false}
          />

          <FormGroup
            getter={card}
            setter={setCard}
            label="Cards (list of available cards)"
            inputType="select"
            options={options}
            displayOthersInSelect={false}
            className="w-100 mb-3"
            placeholder="--choose card--"
          />

          {!isLoading && options.length == 0 ? (
            <p className="mb-4 link">
              Heads up! You don't have any card yet! Create one&nbsp;
              <a href={`${settings.CLIENT_URL}/new-card`} target="_blank">
                here
              </a>
            </p>
          ) : null}
        </div>

        <button
          className="btn blue mt-1"
          style={{ width: "11rem" }}
          disabled={isLoading}
          onClick={importCard}
        >
          {isLoading ? <LoadingContentOnButton text={loadingText} /> : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default Import;
