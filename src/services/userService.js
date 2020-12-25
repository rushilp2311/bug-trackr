import http from './httpService';
import * as teamService from './teamService';

const apiEndpoint = `/users`;

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export async function joinTeam(user) {
  const team = await teamService.findTeam(user.team);
  if (team) {
    return http.post(`${apiEndpoint}/addtoteam`, user);
  }
  return new Error('Team not Found');
}

export async function leaveTeam(user) {
  const currentUser = await http.post(`${apiEndpoint}/leaveteam`, user);
  return currentUser;
}

export async function getAllUsersByTeamId(teamId) {
  const allUsersList = await http.get(
    `${apiEndpoint}/getallusersbyteamid/${teamId}`
  );
  return allUsersList;
}
