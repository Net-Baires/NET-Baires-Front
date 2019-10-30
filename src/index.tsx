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
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
let storeGlobal = createStore(rootReducer);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        // tslint:disable:no-console
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
  window.addEventListener("install", () => {
    console.log("install;");
  });
  window.addEventListener("activate", () => {
    console.log("activate");
  });
}

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
const history = createBrowserHistory();

ReactDOM.render(
  <UserProvider>
    <Provider store={storeGlobal}>
      <ThroughProvider>
        <ToastProvider>
          <Router history={history}>
            <AppConnected />
          </Router>
        </ToastProvider>
      </ThroughProvider>
    </Provider>
  </UserProvider>,
  document.getElementById("root")
);
