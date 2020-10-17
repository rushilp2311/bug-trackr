import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/team";

// Finding a Team
export function findTeam(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export async function getCurrentUserTeam(teamid) {
  const res = await findTeam(teamid);
  return res.data;
}

export async function addBug(bug) {
  const result = await http.post(`${apiUrl}/bug`, bug);
  return result;
}

export async function addComment(comment) {
  const result = await http.post(`${apiUrl}/comment`, comment);
  return result;
}

export function getAllTeam() {}
