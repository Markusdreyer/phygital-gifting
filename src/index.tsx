import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider, FirestoreProvider } from "reactfire";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { BrowserRouter } from "react-router-dom";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig, {});
const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <FirestoreProvider sdk={firestore}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </FirestoreProvider>
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
