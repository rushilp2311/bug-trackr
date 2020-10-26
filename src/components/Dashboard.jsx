import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import AddTeam from './AddTeam';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

function Dashboard() {
  const user = useContext(UserContext);
  return (
    <>
      {user.currentUser.isAdmin ? (
        <AdminDashboard />
      ) : user.currentUser.team === 0 ? (
        <>
          <AddTeam context={user} />
        </>
      ) : (
        <UserDashboard />
      )}
    </>
  );
}

export default Dashboard;
