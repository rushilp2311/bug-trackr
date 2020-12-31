import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../images/404.svg';

const NotFound = () => {
  return (
    <div className="notfound__container">
      <img src={notfound} alt="notfound" className="notfound__image" />
      <Link to="/">
        <button className="goback__btn">Go back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
