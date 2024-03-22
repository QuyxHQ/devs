import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { QuyxSIWS } from "@quyx/siws";
import { useSandboxStore } from "../../../context/SandboxProvider";
import { LoadingContentOnButton } from "../../..";
import { truncateAddress } from "../../../../utils/helpers";
import { PiThumbsUp } from "react-icons/pi";

const Login = () => {
  const [message, setMessage] = useState<Object>();
  const [signature, setSignature] = useState<Uint8Array>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Preparing message");

  const { publicKey, signMessage } = useWallet();
  const { sandboxSdk, setResponse, setTokens, isLoggedIn } = useSandboxStore();

  async function init() {
    if (!sandboxSdk || isLoading) return;

    setBtnText("Preparing message");
    setIsLoading(true);
    const message = await sandboxSdk.init({
      address: publicKey?.toBase58()!,
    });

    if (!message) return;
    setMessage(message);

    const msg = new QuyxSIWS(message);
    const sig = await signMessage!(msg.prepare());
    setSignature(sig);
  }

  useEffect(() => {
    (async function () {
      if (!signature || !sandboxSdk) return;

      setBtnText("Processing");
      setIsLoading(true);

      const resp = await sandboxSdk.login({
        message: message!,
        signature,
      });

      if (resp.data.status) setTokens!(resp.data.data);

      setResponse!(resp.data);
      setIsLoading(false);
    })();
  }, [signature]);

  return (
    <div className="sandbox-methods-box d-flex align-items-center jusitify-content-center">
      {isLoggedIn ? (
        <div className="d-flex flex-column jusitify-content-center">
          <h3 className="head">Logged In!</h3>
          <p className="intro">
            Heads up! you are now in! Other tabs are now open! navigate across tabs to
            explore sandbox
          </p>

          <PiThumbsUp size={35} />
        </div>
      ) : (
        <div className="d-flex flex-column jusitify-content-center">
          <h3 className="head">Sign message</h3>
          <p className="intro">
            your solana address "<strong>{truncateAddress(publicKey?.toBase58())}</strong>
            " will be used to create a message for you to sign inorder to verify ownership
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
