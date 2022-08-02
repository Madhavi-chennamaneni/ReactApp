import React from 'react';
import SigninForm from './SigninForm'
import SignupForm from './SignupForm';
import { useState } from 'react';
import './LoginPage.css'

const LoginPage = () => {
    const [toggle, setToggle] = useState(1);
    const handleClick = (index) => {
        setToggle(index);
    }
    return (
        <form className='form'>
            <div className='tabs'>
                <div className={toggle === 1 ? 'active' : 'tab'} onClick={() => handleClick(1)}>Sign In</div>
                <div className={toggle === 2 ? 'active' : 'tab'} onClick={() => handleClick(2)}>Sign Up</div>
            </div>
            <div className='formContent'>
                {(toggle==1)&&<SigninForm  />}
                {(toggle==2)&&<SignupForm  />}
            </div>
        </form>
    )
}

export default LoginPage;