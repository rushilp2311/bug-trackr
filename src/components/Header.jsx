import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/app.scss";

import auth from "../services/authService";
function Header(props) {
  const { user } = props;
  return (
    <header className='header'>
      <Link to='/' style={{ textDecoration: "none" }}>
        <p className='logo'>Bug Trackr</p>
      </Link>
      <div className='header__links'>
        {!user && (
          <React.Fragment>
            <NavLink to='/signin' style={{ textDecoration: "none" }}>
              <p>Sign In</p>
            </NavLink>
            <Link to='/signup' style={{ textDecoration: "none" }}>
              <button>Sign Up</button>
            </Link>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink to='/profile'>
              <p>{auth.getCurrentUser().name}</p>
            </NavLink>
            <NavLink to='/logout'>
              <button className='logout__button'>Logout</button>
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </header>
  );
}
export default Header;
