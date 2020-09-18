import React from "react";
import signin from "../images/signin.svg";
function SignIn() {
  return (
    <div className='main__container'>
      <div className='form__container'>
        <div className='form__left'>
          <img src={signin} alt='singin' />
        </div>
        <div className='form__right'>
          <p>Sign In</p>
          <form>
            <div className='form__group'>
              <label htmlFor='email'>Email</label>
              <input type='text' />
            </div>
            <div className='form__group'>
              <label htmlFor='password'>Password</label>
              <input type='password' />
            </div>
            <button>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
