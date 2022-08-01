import React from 'react'

const SignupForm = ({ toggle}) => {
    return (
        <div className='signUpForm'>
            {toggle === 2 ? (
                <form autoComplete='off'>
                    <input type='text' required placeholder='Enter your Name' autoFocus /><br />
                    <input type="email" required placeholder="Enter your email" /><br />
                    <input type='number' required placeholder="Enter your mobile no." id='mobileNumber' /><br />
                    <input type="text" required placeholder="Enter your College Name" /><br />
                    <input type="text" required placeholder="Batch No" /><br />
                    <button type="button" className="signupBtn">SignUp</button>
                    <hr />
                </form>
            ) : null}

        </div>
    )
}

export default SignupForm;