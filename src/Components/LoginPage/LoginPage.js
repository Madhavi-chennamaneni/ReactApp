import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
    return(
        <form className='loginForm'>
            <div className='tabs'>Sign In</div>
            <div className='signInForm' >
                <button id='signInBtn'>SignIn with google</button>
            </div>
        </form>
    )
}

export default LoginPage;
