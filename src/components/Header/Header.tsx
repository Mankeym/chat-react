import React, {useContext} from 'react';
import './Header.sass'
import RouteButton from "../RouteButton/RouteButton";
import {ContextAuth} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";


const Header = () => {

    const {auth,firestore} = useContext(ContextAuth)
    const [user] = useAuthState(auth)

    return (
        <header className={'header'}>
            <div className={'header__container'}>
                <div className={'header__link-container'}>

                    {
                        user ? (
                            <>
                           <RouteButton onClick={()=> signOut(auth)} name={'Выйти'} path={'#/login'} />
                            </>
                        ) : (
                            <>
                            <RouteButton onClick={null} name={'Авторизоваться'} path={'#/login'} />
                            <RouteButton onClick={null} name={'Зарегистрироваться'} path={'#/registration'} />
                            </>
                        )
                    }

                </div>
            </div>
        </header>
    );
};

export default Header;
