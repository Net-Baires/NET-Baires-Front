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
let storeGlobal = createStore(rootReducer);
ReactDOM.render(
  <UserProvider>
    <Provider store={storeGlobal}>
      <ThroughProvider>
        <AppConnected />
      </ThroughProvider>
    </Provider>
  </UserProvider>,
  document.getElementById("root")
);
