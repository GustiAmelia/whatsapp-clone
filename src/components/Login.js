import React from 'react';
import '../styles/Login.css';
import {Button} from '@material-ui/core';
import {auth,provider} from '../firebase';
import {useStateValue} from '../StateProvider';
import * as actions from '../redux/action/actiionTypes';

const Login =()=> {

  const [{},dispatch] = useStateValue();

  const signIn =()=>{
    auth
    .signInWithPopup(provider)
    .then((results)=>{
      dispatch({
        type:actions.set_user,
        user:results.user
      })
    })
    .catch((error)=>alert(error.message))
  }
  return (
    <div className='login'>
      <div className='login__container'>
        <img 
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png'
        alt=''/>
        <div className='login__text'>
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  )
}

export default Login
