import React from 'react';
import TeamCard from './TeamCard';

/**
 * TODO: Finish the Admin functionality.
 */

function AdminDashboard() {
  return (
    <div className="admin__dashboard">
      <div className="admin__header">
        <p>Admin Dashboard</p>
        <button>Add a Team</button>
      </div>
      <div className="admin__body">
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </div>
    </div>
  );
}
export default AdminDashboard;
