import React from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import * as authService from '../services/authService';

function Profile(props) {
  const user = authService.getCurrentUser();
  return (
    <>
      <div className="profile__container">
        <div className="bug__details__goback">
          <Link to="/">
            <span>
              <BiArrowBack />
            </span>
            <p>Go Back</p>
          </Link>
        </div>
        <div className="profile__header">
          <p>{user.name}</p>
        </div>
        <div className="profile__body">
          <p className="profile__id">
            <span>Your Unique ID :</span> {user._id}
          </p>
          <p className="profile__email">
            <span>Email:</span> {user.email}
          </p>
          <p className="profile__team">
            <span>Your Team ID:</span> #{user.team}{' '}
          </p>
          <button className="profile__btn">Leave this team</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
