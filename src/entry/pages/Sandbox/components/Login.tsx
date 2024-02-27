import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { useSandboxStore } from "../../../context/SandboxProvider";
import { SiweMessage } from "siwe";
import { TOAST_STATUS, customToast } from "../../../../utils/toast.utils";
import { LoadingContentOnButton } from "../../..";
import { truncateAddress } from "../../../../utils/helpers";
import { PiThumbsUp } from "react-icons/pi";

const Login = () => {
  const [message, setMessage] = useState<SiweMessage>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Preparing message");

  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const { data, error, signMessage } = useSignMessage();

  const { sandboxSdk, setResponse, setTokens, isLoggedIn } = useSandboxStore();

  useEffect(() => {
    if (error) customToast({ type: TOAST_STATUS.ERROR, message: error.message });
  }, [error]);

  async function init() {
    if (!sandboxSdk || isLoading) return;

    setBtnText("Preparing message");
    setIsLoading(true);
    const message = await sandboxSdk.init({
      address: accountData?.address!,
      chainId: activeChain?.id!,
    });

    setMessage(message);
    if (message) signMessage({ message: message.prepareMessage() });
  }

  useEffect(() => {
    (async function () {
      if (!data || !sandboxSdk) return;

      setBtnText("Processing");
      setIsLoading(true);

      const resp = await sandboxSdk.login({
        address: accountData?.address!,
        message: message!,
        signature: data,
      });

      if (resp.data.status) setTokens!(resp.data.data);

      setResponse!(resp.data);
      setIsLoading(false);
    })();
  }, [data]);

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      {isLoggedIn ? (
        <div className="d-flex flex-column jusitify-content-center">
          <h3 className="head">Sign in with Ethereum</h3>
          <p className="intro">
            Heads up! you are now in! Other tabs are now open! navigate across tabs to
            explore sandbox
          </p>

          <PiThumbsUp size={35} />
        </div>
      ) : (
        <div className="d-flex flex-column jusitify-content-center">
          <h3 className="head">Sign in with Ethereum</h3>
          <p className="intro">
            your eth address "<strong>{truncateAddress(accountData?.address)}</strong>"
            will be used to create a message for you to sign inorder to verify ownership
            of address
          </p>

          <button className="btn" onClick={init} disabled={isLoading}>
            {isLoading ? <LoadingContentOnButton text={btnText} /> : "Sign In"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
