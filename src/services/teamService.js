import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/team";

// Finding a Team
export function findTeam(id) {
  return http.get(`${apiEndpoint}/${id}`);
}
