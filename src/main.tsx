import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppProvider from "./entry/context/AppProvider.tsx";
import { WagmiConfig, createClient, defaultChains, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import SandboxProvider from "./entry/context/SandboxProvider.tsx";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <AppProvider>
        <SandboxProvider>
          <App />
        </SandboxProvider>
      </AppProvider>
    </WagmiConfig>
  </React.StrictMode>
);
