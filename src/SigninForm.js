import React from 'react'

const SigninForm = ({ toggle }) => {
  return (
    <div className='signInForm'>
      {toggle === 1 ? (
        <button id='signInBtn'>SignIn with google</button>
      ) : null}
    </div>

  )
}

export default SigninForm