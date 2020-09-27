import React from "react";
import { toast } from "react-toastify";
import singup from "../images/signup.svg";
import "react-toastify/dist/ReactToastify.css";
import { isEmail } from "validator";
toast.configure();
class SignUp extends React.Component {
  constructor(props) {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    data: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
  });

  //Handling Input Change
  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };
  validate = async () => {
    const { data } = this.state;
    let errors = {};
    if (data.name === "") errors.name = "First Name cannot be blank.";
    if (!isEmail(data.email)) errors.email = "Email must be valid";
    if (data.email === "") errors.email = "Email can not be blank";
    if (data.password === "") errors.password = "Password must be valid";
    if (data.confirmPassword !== data.password)
      errors.confirmPassword = "Password must match";

    return errors;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const errors = await this.validate();
    if (Object.keys(errors).length === 0) {
      // Call the api

      toast.success("Success", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
      });

      //Show success message
      this.setState(this.getInitialState());
    } else {
      this.setState({ errors });
    }
  };
  render() {
    const { data, errors } = this.state;
    return (
      <div className='signup__form'>
        <div className='signup__header'>
          <p>Sign up for free to start catching bugs.</p>
          <button className='google_btn'>SIGN UP WITH GOOGLE</button>
        </div>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className='signup__body'>
            <p>Sign up with your email address</p>
            <div className='form__group'>
              <div className='label'>
                <label>What's your email?</label>
              </div>
              <input
                type='text'
                value={data.email}
                name='email'
                onChange={this.handleChange}
                placeholder='Enter your email.'
              />
            </div>
            <div className='form__group'>
              <div className='label'>
                <label>What's your Name?</label>
              </div>
              <input
                type='text'
                placeholder='Enter your name.'
                value={data.name}
                onChange={this.handleChange}
              />
            </div>
            <div className='form__group'>
              <div className='label'>
                <label>Create a Password</label>
              </div>
              <input
                type='password'
                placeholder='Create a password.'
                value={data.password}
                onChange={this.handleChange}
              />
            </div>
            <div className='form__group'>
              <div className='label'>
                <label>Confirm your password</label>
              </div>
              <input
                type='password'
                placeholder='Confirm your password.'
                value={data.confirmPassword}
                onChange={this.handleChange}
              />
            </div>
            <button className='signup_btn'>SIGN UP</button>
          </div>
        </form>
      </div>
    );
  }
}
export default SignUp;
