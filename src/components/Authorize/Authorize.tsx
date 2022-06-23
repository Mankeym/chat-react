import React, {useState} from 'react';
import './Authorize.sass'
import {ContextAuth} from "../../index";
import firebase from "firebase/compat/app";
import { signInWithPopup,GoogleAuthProvider,signInWithEmailAndPassword,GithubAuthProvider } from "firebase/auth";
import firebaseui from "firebaseui";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {addDoc, collection} from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";


const Authorize = () => {
    const {auth,firestore} = React.useContext(ContextAuth)
    const [user]:any = useAuthState(auth)
    const [users, loadingUsers] = useCollectionData(
        collection(firestore, 'users')
    )
    const [userDB, setUserDB] = useState(false)

    const loginGoogle = async () =>{
        const provider:any = new GoogleAuthProvider()
        const {user}:any = await signInWithPopup(auth,provider)
        console.log(user)
        users?.forEach((item)=> {
            return item.uid === user.uid ? setUserDB(true) : ''

        })
        const pushUsersDB = async () => {
            await addDoc(collection(firestore, "users"), {
                uid: user?.uid,
                email: user?.email,
                name: user?.displayName,
                photoUrl: user.photoUrl ? user.photoURL : null
            });
        }
        pushUsersDB()
            .then((result)=>{
                console.log(result)
            })
            .catch((error)=>{
                alert(error)
            })

    }

    const loginPasswordAndEmail =  (e: React.SyntheticEvent<EventTarget>) =>{
        e.preventDefault()
        const email = document.querySelector('.registration__input_email')
        const password = document.querySelector('.registration__input_password')
        signInWithEmailAndPassword(auth, (email as HTMLInputElement).value, (password as HTMLInputElement).value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    const provider = new GithubAuthProvider();


    return (
        <div className={'authorize'}>
            <form className={'authorize__form'}>
                <input type={'hidden'} className={'authorize__input_hidden'} />
                <h1 className={'authorize__title'}>Авторизация</h1>
                <div className={'authorize__input-container'}>
                    <span className={'authorize__input-title'}>Email</span>
                    <input className={'authorize__input registration__input_email'} type={"email"} name={'email'} placeholder={'net@mail.ru'} />
                    <span className={'authorize__input-title'}>Пароль</span>
                    <input className={'authorize__input registration__input_password'} type={"password"} name={'password'} placeholder={'**********'}/>
                </div>
                    <button onClick={loginPasswordAndEmail} className={'authorize__submit'}>Войти</button>
            </form>
            <div className={'authorize__alternative-container'}>
                <button onClick={loginGoogle} className={'authorize__alternative-button authorize__alternative-button_google'}> Авторизоваться через Google</button>
                {/*<button className={'authorize__alternative-button authorize__alternative-button_github'}> Авторизоваться через Github</button>*/}
            </div>
        </div>
    );
};

export default Authorize;
