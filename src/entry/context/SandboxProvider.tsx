import { createContext, useContext, useEffect, useState } from "react";
import Sandbox from "../../utils/class/sandbox.class";

const SandboxContext = createContext<SandboxContextProps & { sandboxSdk?: Sandbox }>({
  isLoggedIn: false,
  isMounting: false,
  response: {},
});

export const useSandboxStore = () => useContext(SandboxContext);

const SandboxProvider = ({ children }: { children: React.JSX.Element }) => {
  const [isMounting, setIsMounting] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [response, setResponse] = useState<Object>({});
  const [tokens, setTokens] = useState<TokenProps>();
  const [clientId, setClientId] = useState<string>();
  const [sandboxSdk, setSandboxSdk] = useState<Sandbox>();

  useEffect(() => {
    (async function () {
      if (!clientId) return;

      setIsMounting(true);

      const sdk = new Sandbox(clientId, tokens);
      const info = await sdk.currentSdkUser();
      setIsLoggedIn(info ? true : false);

      setSandboxSdk(sdk);
      setIsMounting(false);
    })();
  }, [tokens, clientId]);

  return (
    <SandboxContext.Provider
      value={{
        isMounting,
        isLoggedIn,
        response,
        clientId,
        sandboxSdk,
        setResponse,
        setClientId,
        setTokens,
      }}
    >
      {children}
    </SandboxContext.Provider>
  );
};

export default SandboxProvider;
