import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { UserProvider } from "./contexts/UserContext";
import { AppConnected } from "./components/App";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store";
import { ThroughProvider } from "react-through";
import { reactAI } from "react-appinsights";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { Config } from "./services/config";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { initCommunication } from './services/communicationServices';
import ATHS from 'add-to-homescreen-control'
ATHS.enable()
let storeGlobal = createStore(rootReducer);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/NET-Baires-Service-Workes.js")
      .then(reg => {
        Notification.requestPermission().then(function (permission) {
          console.log("Notification permission");
        });
        reg.installing; // the installing worker, or undefined
        reg.waiting; // the waiting worker, or undefined
        reg.active; // the active worker, or undefined
        reg.addEventListener('updatefound', () => {
          reg.update().then(x => {
            setTimeout(() => document.location.reload(true), 5000);
          });
        });
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
  window.addEventListener("install", () => {

  });
  window.addEventListener("activate", () => {
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
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
initCommunication();
ReactDOM.render(
  <UserProvider>
    <Provider store={storeGlobal}>
      <ThroughProvider>
        <Router history={history}>
          <AppConnected />
        </Router>
      </ThroughProvider>
    </Provider>
  </UserProvider>,
  document.getElementById("root")
);
