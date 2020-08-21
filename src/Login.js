import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import {  auth,provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

export const Login = () => {

    const [ {} ,dispatch] = useStateValue()

    const signIn = ()=>{
        auth
        .signInWithPopup(provider)
        .then((result)=> {
            dispatch({
                type: actionTypes.SET_USER,
                user:result.user
            })
        })
        .catch((error)=> alert(error.message))
    }
    return (
        <div className='login'>
            <div className='login__container'>
                <img src="https://assets.dryicons.com/uploads/icon/svg/7789/cbbc7282-1038-4d16-99bf-53b0bdec0a87.svg"
                alt=''
                />
                <div className='login__text'>
                    <h1>Sign in to start chat</h1>
                </div>
                <Button type='submit' onClick={signIn}>
                    Sign in using Google
                </Button>
            </div>

        </div>
    )
}
