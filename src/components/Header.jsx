import React from "react";
import "../styles/app.scss";
function Header() {
  return (
    <header className='header'>
      <p>Bug Trackr</p>
      <div className='header__links'>
        <p>Sign In</p>
        <button>Sign Up</button>
      </div>
    </header>
  );
}
export default Header;
