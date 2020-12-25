import React, { useEffect, useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { GoIssueOpened } from 'react-icons/go';
import * as userService from '../services/userService';
import * as teamService from '../services/teamService';

/**
 * TODO: Load live data from backend.
 */

function TeamCard(props) {
  const [openBugs, setOpenBugs] = useState(0);
  const [Id, setId] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [closeBugs, setClosedBugs] = useState(0);
  const [teamMember, setTeamMembers] = useState(0);

  useEffect(() => {
    const { team } = props;
    const { bugs, id, name } = team;
    setId(id);
    setTeamName(name);
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

  const deleteTeam = async (teamId) => {
    const result = await teamService.deleteTeamById(teamId);
    if (result.status === 200) {
      window.location = '/';
    }
  };

  return (
    <div className="teamcard__container">
      <div className="teamcard__header">
        <p>{`${teamName}`}</p>
      </div>
      <div className="teamcard__body">
        <p className="teamid">{`Team Id :${Id}`}</p>
        <p className="teammembers">{`${teamMember} Team Members`}</p>
        <p className="openbugs">
          <GoIssueOpened /> {`${openBugs} Open Bugs`}
        </p>
        <p className="closedbugs">
          <FcCheckmark className="checkmark" /> {`${closeBugs} Closed Bugs`}
        </p>
        <button onClick={() => deleteTeam(Id)}>Delete</button>
      </div>
    </div>
  );
}

export default TeamCard;
