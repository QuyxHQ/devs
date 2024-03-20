import {
  TbCopy,
  TbCurrencyEthereum,
  TbDatabaseImport,
  TbExternalLink,
  TbFile,
  TbListDetails,
  TbLogout,
  TbTrash,
  TbUser,
  TbUserSearch,
  TbX,
} from "react-icons/tb";
import {
  Cards,
  Current,
  DeleteAccount,
  Import,
  Login,
  Logout,
  FindUser,
} from "./components";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { copyToClipboard, truncateAddress } from "../../../utils/helpers";
import { FormGroup, Loader, LoadingContentOnButton } from "../..";
import { useSandboxStore } from "../../context/SandboxProvider";
import { api } from "../../../utils/class/api.class";
import settings from "../../../utils/settings";
import { chainId } from "../../context/SolanaProvider";

const Sandbox = () => {
  const { response, clientId, setClientId, isMounting, isLoggedIn } = useSandboxStore();
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const [selectedMethod, setSelectedMethod] = useState<number>(0);
  const [_clientId, _setClientId] = useState<string>("");
  const [appsOptions, setAppsOptions] = useState<{ label: string; value: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      if (publicKey) {
        // if wallet has been connected
        setIsLoading(true);
        const resp = await api.getAllApps({ page: 1, limit: 1000 });
        if (!resp.status || !resp.data) return;

        const options: { label: string; value: string }[] = [];
        resp.data.map((app) => options.push({ label: app.name, value: app.clientID }));
        setAppsOptions(options);
        setIsLoading(false);
      }
    })();
  }, [publicKey]);

  const methods = [
    {
      label: "SIWE",
      component: <Login />,
      icon: <TbCurrencyEthereum />,
      desc: "Sign in with ethereum",
      docs: "/#",
    },
    {
      label: "User Info",
      component: <Current />,
      icon: <TbUser />,
      desc: "Get's info about logged in user",
      docs: "/#",
    },
    {
      label: "User Cards",
      component: <Cards />,
      icon: <TbListDetails />,
      desc: "Gets user cards across all chain",
      docs: "/#",
    },
    {
      label: "Import Card",
      component: <Import />,
      icon: <TbDatabaseImport />,
      desc: "Update user preferred card",
      docs: "/#",
    },
    {
      label: "Find User",
      component: <FindUser />,
      icon: <TbUserSearch />,
      desc: "Finds user from address",
      docs: "/#",
    },
    {
      label: "Delete Account",
      component: <DeleteAccount />,
      icon: <TbTrash />,
      desc: "Delete account info",
      docs: "/#",
    },
    {
      label: "Logout",
      component: <Logout />,
      icon: <TbLogout />,
      desc: "Destroys existing session",
      docs: "/#",
    },
  ];

  async function disconnectWallet() {
    if (!publicKey) return;
    if (!confirm("Are you sure you want to disconnect your wallet?")) return;

    await disconnect();
  }

  return (
    <section>
      <h1 className="page-title mb-4">Sandbox</h1>

      <div className="col-12">
        <div className="row g-4">
          <div className="col-12 col-md-5 col-xl-3">
            <div className="methods-box">
              {methods.slice(1, methods.length).map((method, index) => (
                <div key={`sandbox-method-${index + 1}`}>
                  <div
                    onClick={() => setSelectedMethod(index + 1)}
                    className={`single-method ${
                      selectedMethod == index + 1 ? "active" : ""
                    }`}
                  >
                    <div>{method.icon}</div>

                    <div>
                      <span className="d-block mb-1">{method.label}</span>
                      <p className="intro">{method.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-md-7 col-xl-5">
            <div className="sandbox-options">
              <div className="body">
                {publicKey ? (
                  clientId ? (
                    isMounting ? (
                      <div className="connect-wallet mt-5">
                        <Loader fill="#bbb" />
                      </div>
                    ) : (
                      <div>
                        {!isLoggedIn && selectedMethod !== 0
                          ? methods[0].component
                          : methods[selectedMethod].component}

                        <div className="docs-btn">
                          <a
                            href={`${settings.DOCS_URL}${
                              !isLoggedIn && selectedMethod !== 0
                                ? methods[0].docs
                                : methods[selectedMethod].docs
                            }`}
                            target="_blank"
                          >
                            <button>
                              <TbFile />
                              <span>View docs</span>
                              <TbExternalLink />
                            </button>
                          </a>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="connect-wallet pt-5 mt-3">
                      <h2>Choose App</h2>
                      <p>Choose an app to use while interacting with Sandbox</p>
                      <FormGroup
                        setter={_setClientId}
                        getter={_clientId}
                        inputType="select"
                        label="App"
                        displayLabel={false}
                        options={appsOptions}
                        displayOthersInSelect={false}
                        placeholder="--choose app--"
                        className="mb-2"
                      />

                      <button
                        className="btn blue"
                        onClick={() => setClientId!(_clientId)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <LoadingContentOnButton text="Getting apps.." />
                        ) : (
                          "Proceed"
                        )}
                      </button>
                    </div>
                  )
                ) : (
                  <div className="connect-wallet">
                    <h2>Connect wallet</h2>
                    <p>
                      You need to connect your wallet inorder to interact with sandbox
                    </p>
                    <button
                      className="btn blue"
                      onClick={() => setVisible(true)}
                      disabled={connecting}
                    >
                      {connecting ? <LoadingContentOnButton /> : <>Connect &raquo;</>}
                    </button>
                  </div>
                )}
              </div>

              <div className="footer">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="status d-flex align-items-center">
                    <span className={publicKey ? "green" : "red"}></span>
                    <p>{publicKey ? "connected" : "disconnected"}</p>
                  </div>

                  <div className="d-flex align-items-center c-and-a">
                    <div className="address d-flex align-items-center">
                      <p>{truncateAddress(publicKey?.toBase58()) ?? "-------"}</p>

                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "0.4rem" }}
                      >
                        <TbCopy
                          className="pointer"
                          onClick={() => copyToClipboard(publicKey?.toBase58() ?? "--")}
                        />

                        <TbX className="pointer" onClick={disconnectWallet} />
                      </div>
                    </div>

                    <div className="chain d-flex align-items-center">
                      <p>
                        Chain ID: <strong>{chainId}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-4">
            <div className="sandbox-response">
              <div className="header">
                <h3>Response</h3>

                <div onClick={() => copyToClipboard(JSON.stringify(response))}>
                  <TbCopy />
                </div>
              </div>

              <div className="body">
                <ReactJson
                  src={response}
                  name={null}
                  indentWidth={5}
                  enableClipboard={false}
                  displayObjectSize={false}
                  displayDataTypes={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sandbox;
