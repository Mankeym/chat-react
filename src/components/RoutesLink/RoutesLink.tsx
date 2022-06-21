import React, {useContext, useEffect} from 'react';
import {Route,Routes} from "react-router-dom";
import Authorize from "../Authorize/Authorize";
import Registration from "../Registration/Registration";
import Chat from "../Chat/Chat";
import {ContextAuth} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const RoutesLink = () => {

    let navigate = useNavigate();
    const {auth} = useContext(ContextAuth)
    const [user] = useAuthState(auth)
    useEffect(() => {
        if (user){
            return navigate("/chat");
        }
    },[user]);
    return (
        <Routes>
            {user ? (
                <Route path={'/chat'} element={<Chat />} />
            ): ''}

            <Route path={'/login'} element={<Authorize />} />
            <Route path={'/registration'} element={<Registration />} />
            <Route path={'*'} element={<Authorize />} />
        </Routes>
    );
}
export default RoutesLink
