import React, { useEffect, useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { GoIssueOpened } from 'react-icons/go';
import * as userService from '../services/userService';

/**
 * TODO: Load live data from backend.
 */

function TeamCard(props) {
  const { team } = props;
  const { name, id, bugs } = team;
  const [openBugs, setOpenBugs] = useState(0);
  const [closeBugs, setClosedBugs] = useState(0);
  const [teamMember, setTeamMembers] = useState(0);

  useEffect(() => {
    function getBugsStatus(bugsList) {
      const obugs = bugsList.filter((b) => b.isOpen === true).length;
      const cbugs = bugsList.filter((b) => b.isOpen !== true).length;

      setOpenBugs(obugs);
      setClosedBugs(cbugs);
    }
    async function getAllUsers() {
      const result = await userService.getAllUsersByTeamId(id);
      setTeamMembers(result.data.length);
    }
    getAllUsers();
    getBugsStatus(bugs);
  }, []);
  return (
    <div className="teamcard__container">
      <div className="teamcard__header">
        <p>{`${name}`}</p>
      </div>
      <div className="teamcard__body">
        <p className="teamid">{`Team Id :${id}`}</p>
        <p className="teammembers">{`${teamMember} Team Members`}</p>
        <p className="openbugs">
          <GoIssueOpened /> {`${openBugs} Open Bugs`}
        </p>
        <p className="closedbugs">
          <FcCheckmark className="checkmark" /> {`${closeBugs} Closed Bugs`}
        </p>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default TeamCard;
