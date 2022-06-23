import React, {useContext, useEffect, useState} from 'react';
import './Chat.sass'
import {ContextAuth} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { collection, addDoc,doc, getDoc } from "firebase/firestore";

const Chat = () => {
    const {auth, firestore} = useContext(ContextAuth)
    const [user]:any = useAuthState(auth)
    const [value, setValue] = useState('')
    const [userProfileActive, setUserProfileActive] = useState('')
    const scrollBlock:HTMLElement | null = document.querySelector('.chat__container')
    const [messages, loading] = useCollectionData(
        collection(firestore, 'messages')
    )
    const [users, loadingUsers] = useCollectionData(
        collection(firestore, 'users')
    )
    console.log(user)
    const userData = users?.filter((item) => item.uid === user?.uid)[0]
    const Timestamp = require('firebase-firestore-timestamp');
    const sendMessage = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault()
        if(value.length > 0){
            await addDoc(collection(firestore, "messages"), {
            uid: user?.uid,
            displayName: userData?.displayName ? userData?.displayName : user?.displayName ? user?.displayName : 'Аноним',
            photoUrl: user?.photoURL,
            text: value,
            createAt: Timestamp.now().seconds
        });
        setValue('')
        } else {
            alert('Введите сообщение')
        }
    }
    useEffect(()=>{
        if(scrollBlock){
            scrollBlock.scrollTop = scrollBlock.scrollHeight
        }
    },[messages])

    const clickUserCard = (event: React.MouseEvent) =>{
        const dataId = event.currentTarget.getAttribute('data-id')
        if(dataId){
            setUserProfileActive(dataId)
        }
    }
    console.log(users)


    return (
        <div className={'chat'}>
            <div className={'chat__content'}>
                <div className={'chat__users'}>
                    { users?.filter((item) => item.uid != user.uid).map((item,index)=> (
                        <div onClick={clickUserCard} className={'chat__user-element'} data-id={item.uid}>
                            <img data-id={item.uid} className={'chat__user-img'} src={item.photoUrl ? item.photoUrl : require('../../img/blankdirectory.png')} alt={item.name} />
                            <p className={'chat__user-title'}>{item.name}</p>
                        </div>
                        ))
                    }
                </div>
                <div className={'chat__container'}>
                    {
                        messages?.sort((a: any, b: any) => {
                            return a.createAt - b.createAt
                        }).filter((i)=> i.uid === userProfileActive).map((item) => (
                            <div className={user?.uid === item.uid ? 'chat__element chat__element_self' : 'chat__element '}>
                                <h4 className={'chat__element-title'}>
                                    {userData?.displayName ? userData?.displayName : item?.displayName ? item?.displayName : 'Аноним'}
                                </h4>
                                <p className={'chat__element-subtitle'}>
                                    {item.text}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={'chat__form-container'}>
                <form className={'chat__form'}>
                   <textarea style={{resize: "none"}} className={'chat__textarea'} placeholder={'Ваше сообщение'}
                             required={true} value={value}
                             onChange={e => setValue(e.target.value)}/>
                    <button onClick={sendMessage} className={'chat__submit'}>Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
