import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { leaveTeam } from '../services/userService';

import * as authService from '../services/authService';
import { UserContext } from '../providers/UserProvider';

const leaveTeamHandle = async (updateUserState, currentUser) => {
  const user = { ...currentUser };
  user.team = 0;
  const result = await leaveTeam(user);
  if (result) {
    await updateUserState(result.data);
  } else {
    console.log('User Not Found');
  }
  window.location = '/';
};
function Profile() {
  const user = authService.getCurrentUser();
  const userContext = useContext(UserContext);
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
          <button
            className="profile__btn"
            onClick={() => leaveTeamHandle(userContext.updateUserState, user)}
          >
            Leave this team
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
