import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import AppProvider from "./entry/context/AppProvider.tsx";
import SandboxProvider from "./entry/context/SandboxProvider.tsx";
import SolanaProvider from "./entry/context/SolanaProvider.tsx";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <SandboxProvider>
        <SolanaProvider>
          <App />
        </SolanaProvider>
      </SandboxProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")!
);
