import React from 'react'
import { Link } from 'react-router-dom' 

const SigninForm = ({ toggle }) => {
  return (
    <div className='signInForm'>
      <button id='signInBtn' > <Link to='/home' style={{color:'white', textDecoration:'none'}}> SignIn with google </Link> </button>
    </div>

  )
}

export default SigninForm