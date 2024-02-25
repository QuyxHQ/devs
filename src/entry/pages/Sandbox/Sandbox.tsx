import {
  TbCopy,
  TbCurrencyEthereum,
  TbDatabaseImport,
  TbListDetails,
  TbLogout,
  TbTrash,
  TbUser,
  TbUserSearch,
  TbX,
} from "react-icons/tb";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import {
  Cards,
  Current,
  DeleteAccount,
  Import,
  Login,
  Logout,
  SingleUser,
} from "./components";
import { useEffect, useState } from "react";
import { copyToClipboard, truncateAddress } from "../../../utils/helpers";
import { LoadingContentOnButton } from "../..";
import { TOAST_STATUS, customToast } from "../../../utils/toast.utils";
import ReactJson from "react-json-view";
import { useSandboxStore } from "../../context/SandboxProvider";

const Sandbox = () => {
  const { connect, connectors, error, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const { response } = useSandboxStore();

  const [selectedMethod, setSelectedMethod] = useState<number>(0);

  useEffect(() => {
    if (error) customToast({ type: TOAST_STATUS.ERROR, message: error.message });
  }, [error]);

  const methods = [
    {
      label: "SIWE",
      component: <Login />,
      icon: <TbCurrencyEthereum />,
      desc: "Sign in with ethereum",
    },
    {
      label: "Current user",
      component: <Current />,
      icon: <TbUser />,
      desc: "Get's info about logged in user",
    },
    {
      label: "User Cards",
      component: <Cards />,
      icon: <TbListDetails />,
      desc: "Gets user cards across all chain",
    },
    {
      label: "Import/Change Card",
      component: <Import />,
      icon: <TbDatabaseImport />,
      desc: "Import card or change current card",
    },
    {
      label: "Find User",
      component: <SingleUser />,
      icon: <TbUserSearch />,
      desc: "Finds user from address",
    },
    {
      label: "Delete Account",
      component: <DeleteAccount />,
      icon: <TbTrash />,
      desc: "Delete account info",
    },
    {
      label: "Logout",
      component: <Logout />,
      icon: <TbLogout />,
      desc: "Destroys existing session",
    },
  ];

  function disconnectWallet() {
    if (!accountData?.address) return;
    if (!confirm("Are you sure you want to disconnect your wallet?")) return;

    disconnect();
  }

  return (
    <section>
      <h1 className="page-title mb-4">Sandbox</h1>

      <div className="col-12">
        <div className="row g-4">
          <div className="col-12 col-md-5 col-xl-3">
            <div className="methods-box">
              {methods.map((method, index) => (
                <div key={`sandbox-method-${index}`}>
                  <div
                    onClick={() => setSelectedMethod(index)}
                    className={`single-method ${selectedMethod == index ? "active" : ""}`}
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
                {accountData?.address ? (
                  methods[selectedMethod].component
                ) : (
                  <div className="connect-wallet">
                    <h2>Connect wallet</h2>
                    <p>
                      You need to connect your wallet inorder to interact with sandbox
                    </p>
                    <button
                      className="btn blue"
                      onClick={() => connect(connectors[0])}
                      disabled={isConnecting}
                    >
                      {isConnecting ? <LoadingContentOnButton /> : <>Connect &raquo;</>}
                    </button>
                  </div>
                )}
              </div>

              <div className="footer">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="status d-flex align-items-center">
                    <span className={accountData?.address ? "green" : "red"}></span>
                    <p>{accountData?.address ? "connected" : "disconnected"}</p>
                  </div>

                  <div className="d-flex align-items-center c-and-a">
                    <div className="address d-flex align-items-center">
                      <p>{truncateAddress(accountData?.address) ?? "-------"}</p>

                      <div
                        className="d-flex align-items-center"
                        style={{ gap: "0.4rem" }}
                      >
                        <TbCopy
                          className="pointer"
                          onClick={() => copyToClipboard(accountData?.address ?? "--")}
                        />

                        <TbX className="pointer" onClick={disconnectWallet} />
                      </div>
                    </div>

                    <div className="chain d-flex align-items-center">
                      <p>
                        Chain ID: <strong>{activeChain?.id ?? "--"}</strong>
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
