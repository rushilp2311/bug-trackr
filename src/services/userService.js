import http from "./httpService";
import * as teamService from "./teamService";
import { apiUrl } from "../config.json";

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
