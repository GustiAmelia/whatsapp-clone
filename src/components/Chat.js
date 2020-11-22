import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../styles/Chat.css';
import {Avatar, IconButton} from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert,} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import db from '../firebase';
import {useStateValue} from '../StateProvider';
import firebase from 'firebase';

const Chat =()=> {

  const [input,setInput]=useState('');
  const [send, setSend]=useState('');
  const { roomId } =useParams();
  const [roomName,setRoomName]=useState('');
  const [messages, setMessages] = useState([]);
  const [ {user},dispatch] = useStateValue();


  useEffect(()=>{
    if(roomId){
      db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>
        setRoomName(snapshot.data().name)
      );
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=> setMessages(snapshot.docs.map(doc => doc.data())))
    }
  },[roomId])

  const sendMessage =(e)=>{
    e.preventDefault();

    db.collection('rooms').doc(roomId).collection('messages').add({
      message:input,
      name :user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar/>
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>
            Last senn {' '}
            {
              new Date(
                messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
            }
          </p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        {messages.map((message,index)=>(
          <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`} key={index}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{
              new Date(message.timestamp?.toDate()).toUTCString()
            }</span>
          </p>
        ))}
      </div>

      <div className='chat__footer'>
        <InsertEmoticonIcon/>
        <form>
          <input value={input} type='text' placeholder='Type a message'
          onChange={(e)=>setInput(e.target.value)}/>
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon/>
      </div>
    </div>
  )
}

export default Chat
