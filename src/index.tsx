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
import { Config } from "./services/config";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { initCommunication } from "./services/communicationServices";
import ATHS from "add-to-homescreen-control";
import firebase from "firebase";
import { updateInformation } from "./services/membersServices";
import { infoToast, darkToast } from './services/toastServices';
ATHS.enable();
export const askForPermissioToReceiveNotifications = () => {
  try {
    const messaging = firebase.messaging();
    messaging.requestPermission().then(() => {
      messaging.getToken().then(token => {
        updateInformation({ pushNotificationId: token })
          .catch(e => {
            console.log("falloo");
            console.log(e);
          });
      });
      messaging.onMessage(payload => {
        console.log("Message received. ", payload);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

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
    measurementId: Config.firebase.pushNotifications.measurementId
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
};
let storeGlobal = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/NET-Baires-Service-Workes.js")
      .then(reg => {
        // Notification.requestPermission().then(function () {
        //   console.log("Notification permission");
        // });
        if (reg.sync) {
          reg.sync.register('NET-Baires-Background-Requests')
            .catch(function (err) {
              return err;
            });
        }

        firebase.messaging().useServiceWorker(reg);
        reg.installing; // the installing worker, or undefined
        reg.waiting; // the waiting worker, or undefined
        reg.active; // the active worker, or undefined
        reg.addEventListener("updatefound", () => {
          // caches.delete("NET-Baires-Cache-Get-Request");
          reg.update().then(() => {
            darkToast("Se encontró una nueva versión de la app. En unos segundos se actualizará.")
            setTimeout(() => document.location.reload(true), 5000);
          });
        });
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  });
  window.addEventListener("install", () => { });
  window.addEventListener("activate", () => { });

  navigator.serviceWorker.addEventListener("controllerchange", () => { });
}

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
