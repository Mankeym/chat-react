import React from 'react';
import './Registration.sass'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {ContextAuth} from "../../index";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const {auth} = React.useContext(ContextAuth)
    console.log(typeof document.querySelector('.registration__input_email'))
    const registration = (e: React.SyntheticEvent<EventTarget>) =>{
        e.preventDefault()
        const email = document.querySelector('.registration__input_email')
        const password   = document.querySelector('.registration__input_password')
        createUserWithEmailAndPassword(auth, (email as HTMLInputElement).value, (password as HTMLInputElement).value)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorCode = error.code;
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
