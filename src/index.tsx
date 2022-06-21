import React, {createContext} from 'react';
import firebase from 'firebase/compat/app';
import ReactDOM from 'react-dom/client';
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import './index.sass';
import App from "./components/App";
import {BrowserRouter, HashRouter} from "react-router-dom";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBeIMnptyr9cK7bFKV62jKBqfsvXKsYkkk",
    authDomain: "chat-react-b4d56.firebaseapp.com",
    projectId: "chat-react-b4d56",
    storageBucket: "chat-react-b4d56.appspot.com",
    messagingSenderId: "240726805397",
    appId: "1:240726805397:web:8d5eecc6558d0f0501449c",
    measurementId: "G-KJM6ZYQKV0"
})


const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp);
export const ContextAuth = createContext({
    auth,
    firestore
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ContextAuth.Provider value={{
          auth,
          firestore
      }} >
      <HashRouter>
            <App />
      </HashRouter>
      </ContextAuth.Provider>
  </React.StrictMode>
);
