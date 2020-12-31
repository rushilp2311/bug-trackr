import React, { useState, useEffect } from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import Hamburger from './Hamburger';
import '../styles/app.scss';

const Header = ({ history, user }) => {
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: 'Menu',
  });
  // State of our button
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    history.listen(() => {
      setState({ clicked: false, menuName: 'Menu' });
    });
  }, [history]);

  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 500);
  };
  // Toggle menu
  const handleMenu = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: 'Close',
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: 'Menu',
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: 'Close',
      });
    }
  };

  return (
    <header>
      <div className="inner-header">
        <div className="logo">
          <Link to="/">BugTrackr.</Link>
        </div>
        {user && (
          <div className="menu">
            <button disabled={disabled} onClick={handleMenu}>
              {state.menuName}
            </button>
          </div>
        )}
        {!user && (
          <div className="header__links">
            <NavLink to="/signin" style={{ textDecoration: 'none' }}>
              <p>Sign In</p>
            </NavLink>

            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button>Sign Up</button>
            </Link>
          </div>
        )}
      </div>
      <Hamburger state={state} />
    </header>
  );
};

export default withRouter(Header);
