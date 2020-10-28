import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/app.scss';
import * as authService from '../services/authService';
import { UserContext } from '../providers/UserProvider';

function Header(props) {
  const { user } = props;
  const currentUser = useContext(UserContext);
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <p className="logo">Bug Trackr</p>
      </Link>
      <div className="header__links">
        {!user && (
          <>
            <NavLink to="/signin" style={{ textDecoration: 'none' }}>
              <p>Sign In</p>
            </NavLink>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button>Sign Up</button>
            </Link>
          </>
        )}
        {user && (
          <>
            <NavLink
              to={{
                pathname: '/profile',
                profile: {
                  updateUserState: currentUser.updateUserState,
                },
              }}
            >
              <p>{authService.getCurrentUser().name}</p>
            </NavLink>
            <NavLink to="/logout">
              <button className="logout__button">Logout</button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
