import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "./contexts/UserContext";
import { AppConnected } from "./components/App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store";
import { ThroughProvider } from "react-through";
import { ToastProvider } from "react-toast-notifications";
import { reactAI } from "react-appinsights";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { Config } from "./services/config";

let storeGlobal = createStore(rootReducer);
let appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: Config.instrumentationKey,
    extensions: [reactAI],
    extensionConfig: {
      [reactAI.extensionId]: { debug: false }
    }
  }
});
appInsights.loadAppInsights();
ReactDOM.render(
  <UserProvider>
    <Provider store={storeGlobal}>
      <ThroughProvider>
        <ToastProvider>
          <AppConnected />
        </ToastProvider>
      </ThroughProvider>
    </Provider>
  </UserProvider>,
  document.getElementById("root")
);
