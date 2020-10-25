import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/team`;

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

export async function deleteBug(bug) {
  const result = await http.delete(`${apiUrl}/bug`, {
    headers: {
      'content-type': 'application/json;charset=utf-8',
      bugid: bug.bugid,
      teamid: bug.teamid,
    },
  });
  return result;
}

export async function deleteComment(comment) {
  const result = await http.delete(`${apiUrl}/comment`, {
    headers: {
      'content-type': 'application/json;charset=utf-8',
      bugid: comment.bugid,
      teamid: comment.teamid,
      commentid: comment.commentid,
    },
  });
  return result;
}

export async function updateBugStatus(bug) {
  const result = await http.post(`${apiUrl}/bug/changeBugStatus`, bug);
  return result;
}
