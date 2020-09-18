import React from "react";
import singup from "../images/signup.svg";
function SignUp() {
  return (
    <div className='main__container'>
      <div className='form__container'>
        <div className='form__left'>
          <img src={singup} alt='singin' />
        </div>
        <div className='form__right'>
          <p>Sign Up</p>
          <form>
            <div className='form__group'>
              <label htmlFor='firstName'>First Name</label>
              <input type='text' />
            </div>
            <div className='form__group'>
              <label htmlFor='lastName'>Last Name</label>
              <input type='text' />
            </div>
            <div className='form__group'>
              <label htmlFor='email'>Email</label>
              <input type='text' />
            </div>
            <div className='form__group'>
              <label htmlFor='password'>Password</label>
              <input type='password' />
            </div>
            <div className='form__group'>
              <label htmlFor='password2'>Confirm Password</label>
              <input type='password' />
            </div>
            <button>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
