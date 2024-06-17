import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import AppProvider from "./entry/context/AppProvider.tsx";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")!
);
