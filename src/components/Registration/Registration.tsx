import React from 'react';
import './Registration.sass'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {ContextAuth} from "../../index";
import {addDoc, collection} from "firebase/firestore";

const Registration = () => {
    const {auth,firestore} = React.useContext(ContextAuth)
    const registration = (e: React.SyntheticEvent<EventTarget>) =>{
        e.preventDefault()
        const email = document.querySelector('.registration__input_email')
        const password   = document.querySelector('.registration__input_password')
        createUserWithEmailAndPassword(auth, (email as HTMLInputElement).value, (password as HTMLInputElement).value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const pushUsersDB = async () => {
                    await addDoc(collection(firestore, "users"), {
                        uid: user.uid,
                        email: user.email,
                        name: null,
                        photoUrl: null
                    });
                }
                pushUsersDB()
                    .then((result)=>{
                        console.log(result)
                    })
                    .catch((error)=>{
                        alert(error)
                    })

            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    return (
        <div className={'registration'}>
            <form className={'registration__form'}>
                <input type={'hidden'} className={'registration__input_hidden'} />
                <h1 className={'registration__title'}>Регистрация</h1>
                <div className={'registration__input-container'}>
                    <span className={'registration__input-title'}>Email</span>
                    <input className={'registration__input registration__input_email'} type={"email"} id={'email'} name={'email'} placeholder={'net@mail.ru'} />
                    <span className={'registration__input-title'}>Пароль</span>
                    <input className={'registration__input registration__input_password'}  type={"password"} id={'password'} name={'password'} placeholder={'**********'}/>
                </div>
                <button onClick={registration} className={'registration__submit'}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Registration;
