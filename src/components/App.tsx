import React, {useContext} from 'react';
import Header from "./Header/Header";
import RoutesLink from './RoutesLink/RoutesLink';
import {ContextAuth} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./Loader/Loader";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";

function App() {
    const {auth,firestore} = useContext(ContextAuth)
    const [user,loading] = useAuthState(auth)
    const [db,loadingDb] = useCollection(collection(firestore,'messages'))
    if (loading && loadingDb){
        return <Loader />
    }
  return (
        <>
            <Header/>
            <main className={'main'}>
                <RoutesLink/>
            </main>
        </>
  );
}

export default App;
