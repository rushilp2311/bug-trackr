import React from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi';
import Form from './common/form';
import auth from '../services/authService';

class SignIn extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  };
  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password'),
  };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
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
    if (auth.getCurrentUser()) return <Redirect to="/" />;

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
              <p>Sign in with your email address</p>
              {this.renderInput('email', 'Enter your Email')}
              {this.renderInput('password', 'Enter your Password', 'password')}
              {this.renderButton('SIGN IN')}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
