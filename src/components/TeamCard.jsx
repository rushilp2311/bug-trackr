import React from "react";
import { FcCheckmark } from "react-icons/fc";
import { GoIssueOpened } from "react-icons/go";
function TeamCard() {
  return (
    <div className='teamcard__container'>
      <div className='teamcard__header'>
        <p>Team Name</p>
      </div>
      <div className='teamcard__body'>
        <p className='teamid'>Team Id : #1234</p>
        <p className='teammembers'>33 Team Members</p>
        <p className='openbugs'>
          <GoIssueOpened /> 10 Open Bugs
        </p>
        <p className='closedbugs'>
          <FcCheckmark className='checkmark' /> 11 Closed Bugs
        </p>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default TeamCard;
