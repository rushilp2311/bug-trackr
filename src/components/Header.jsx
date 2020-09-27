import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../styles/app.scss";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
function Header() {
  return (
    <Router>
      <header className='header'>
        <Link to='/' style={{ textDecoration: "none" }}>
          <p className='logo'>Bug Trackr</p>
        </Link>
        <div className='header__links'>
          <Link to='/signin' style={{ textDecoration: "none" }}>
            <p>Sign In</p>
          </Link>
          <Link to='/signup' style={{ textDecoration: "none" }}>
            <button>Sign Up</button>
          </Link>
        </div>
      </header>
      <Switch>
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}
export default Header;
