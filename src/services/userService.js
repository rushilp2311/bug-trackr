import http from "./httpService";
import * as teamService from "./teamService";
import { apiUrl } from "../config.json";
import authService from "./authService";

const apiEndpoint = apiUrl + "/users";

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
  } else return new Error("Team not Found");
}

export async function getAllUsersByTeamId() {
  const team = authService.getCurrentUser().team;
  const allUsersList = await http.get(
    `${apiEndpoint}/getallusersbyteamid/${team}`
  );
  return allUsersList;
}
