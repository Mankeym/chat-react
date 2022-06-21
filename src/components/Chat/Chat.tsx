import React, {useContext, useState} from 'react';
import './Chat.sass'
import {ContextAuth} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";

const Chat = () => {
    const {auth,firestore} = useContext(ContextAuth)
    const [user] = useAuthState(auth)
    const [value,setValue] = useState('')
    const [messages,loading] = useCollectionData(
        collection(firestore,'messages')
    )
    const Timestamp = require('firebase-firestore-timestamp');
    const sendMessage = async (e:any) => {
        e.preventDefault()

        await addDoc(collection(firestore, "messages"), {
            uid: user?.uid,
            displayName: user?.displayName,
            photoUrl: user?.photoURL,
            text:value,
            createAt: Timestamp.now().seconds
        });
        setValue('')
    }


    return (
       <div className={'chat'}>
           <div className={'chat__container'}>
               {
                   messages?.sort((a:any,b:any)=> {
                       return a.createAt - b.createAt
                   } ).map((item)=>(
                       <div className={user?.uid === item.uid ? 'chat__element chat__element_self' : 'chat__element '}>
                           <h4 className={'chat__element-title'}>
                               {item.displayName}
                           </h4>
                           <p className={'chat__element-subtitle'}>
                               {item.text}
                           </p>
                       </div>
               ))}

           </div>
           <div className={'chat__form-container'}>
               <form className={'chat__form'} >
                   <textarea style={{resize:"none"}} className={'chat__textarea'} placeholder={'Ваше сообщение'} required={true} value={value}
                   onChange={e=>setValue(e.target.value)}/>
                   <button onClick={sendMessage} className={'chat__submit'} >Отправить</button>
               </form>
           </div>
       </div>
    );
};

export default Chat;
