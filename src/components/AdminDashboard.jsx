import React, { useEffect, useState } from 'react';
import TeamCard from './TeamCard';
import * as teamService from '../services/teamService';

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
        <button>Add a Team</button>
      </div>
      <div className="admin__body">
        {allTeams.map((team) => (
          <TeamCard team={team} />
        ))}
      </div>
    </div>
  );
}
export default AdminDashboard;
