import React, {useContext} from 'react';
import './Header.sass'
import RouteButton from "../RouteButton/RouteButton";
import {ContextAuth} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";

const Header = () => {

    const {auth,firestore} = useContext(ContextAuth)
    const [user] = useAuthState(auth)
    const [users, loadingUsers] = useCollectionData(
        collection(firestore, 'users')
    )
    const userData = users?.filter((item) => item.uid === user?.uid)[0]
    console.log(user)
    return (
        <header className={'header'}>
            <div className={user ? 'header__container header__container_login' : 'header__container'}>
                {
                    user ? (
                        <div className={"header__user-info"}>
                            <img className={'header__user-img'} src={userData?.photoURL ? userData?.photoURL : user.photoURL ? user.photoURL : require('../../img/blankdirectory.png')}/>
                            <p className={'header__user-title'}>
                                {userData?.name ? userData?.name : user.displayName ? user.displayName : 'Аноним'}
                            </p>
                        </div>
                    ) : null
                }
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
