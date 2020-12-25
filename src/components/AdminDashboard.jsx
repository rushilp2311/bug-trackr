import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import * as teamService from '../services/teamService';
import AddTeam from './AddTeam';

/**
 * TODO: Finish the Admin functionality.
 */

function AdminDashboard() {
  const [allTeams, setAllTeams] = useState([]);
  useEffect(() => {
    async function getTeams() {
      const teams = await teamService.getAllTeams();
      setAllTeams(teams.data);
    }
    getTeams();
  }, []);
  return (
    <div className="admin__dashboard">
      <div className="admin__header">
        <p>Admin Dashboard</p>
        <AddTeam />
      </div>
      <div className="admin__body">
        {allTeams.map((team) => (
          <TeamCard team={team} key={team._id} />
        ))}
      </div>
    </div>
  );
}
export default AdminDashboard;
