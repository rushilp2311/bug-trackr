import React from 'react';
import Joi from 'joi';
import Form from './common/form';
import * as userService from '../services/userService';
import * as authService from '../services/authService';

class SignUp extends Form {
  state = {
    data: { email: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      authService.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="form__container">
        <div className="signup__form">
          {/* <div className='form__header'>
            <p>Sign up for free to start catching bugs.</p>
            <button className='google_btn'>SIGN UP WITH GOOGLE</button>
          </div>
          <hr /> */}
          <form onSubmit={this.handleSubmit}>
            <div className="form__body">
              <p>Sign up with your email address</p>
              {this.renderInput('email', "What's your email?")}
              {this.renderInput('name', "What's your name?")}
              {this.renderInput('password', 'Create a Password', 'password')}
              {this.renderButton('SIGN UP')}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
