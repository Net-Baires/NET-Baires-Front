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
import firebase from 'firebase';
import { updateInformation } from './services/membersServices';
ATHS.enable()
export const askForPermissioToReceiveNotifications = () => {
  try {
    const messaging = firebase.messaging();
    messaging.requestPermission().then(() => {
      messaging.getToken().then(token => {
        updateInformation({ pushNotificationId: token });
      });
      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
      });
    });

  } catch (error) {
    console.error(error);
  }
}

setTimeout(() => askForPermissioToReceiveNotifications(), 3000);
export const initializeFirebase = () => {
  var firebaseConfig = {
    apiKey: Config.firebase.pushNotifications.apiKey,
    authDomain: Config.firebase.pushNotifications.authDomain,
    databaseURL: Config.firebase.pushNotifications.databaseURL,
    projectId: Config.firebase.pushNotifications.projectId,
    storageBucket: Config.firebase.pushNotifications.storageBucket,
    messagingSenderId: Config.firebase.pushNotifications.messagingSenderId,
    appId: Config.firebase.pushNotifications.appId,
    measurementId: Config.firebase.pushNotifications.measurementId,
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}
let storeGlobal = createStore(rootReducer);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/NET-Baires-Service-Workes.js")
      .then(reg => {
        Notification.requestPermission().then(function () {
          console.log("Notification permission");
        });
        firebase.messaging().useServiceWorker(reg);
        reg.installing; // the installing worker, or undefined
        reg.waiting; // the waiting worker, or undefined
        reg.active; // the active worker, or undefined
        reg.addEventListener('updatefound', () => {
          reg.update().then(() => {
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
initializeFirebase();