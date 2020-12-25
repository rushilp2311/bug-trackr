import React, { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import JoinTeam from './JoinTeam';
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
          <JoinTeam context={user} />
        </>
      ) : (
        <UserDashboard />
      )}
    </>
  );
}

export default Dashboard;
