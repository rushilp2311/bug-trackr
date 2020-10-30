import http from './httpService';

const apiEndpoint = `/team`;

// Finding a Team
export function findTeam(id) {
  return http.get(`${apiEndpoint}/${id}`);
}

export async function getCurrentUserTeam(teamid) {
  const res = await findTeam(teamid);
  return res.data;
}

export async function addBug(bug) {
  const result = await http.post(`/bug`, bug);
  return result;
}

export async function addComment(comment) {
  const result = await http.post(`/comment`, comment);
  return result;
}

export async function deleteBug(bug) {
  const result = await http.delete(`/bug`, {
    headers: {
      'content-type': 'application/json;charset=utf-8',
      bugid: bug.bugid,
      teamid: bug.teamid,
    },
  });
  return result;
}

export async function deleteComment(comment) {
  const result = await http.delete(`/comment`, {
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
  const result = await http.post(`/bug/changeBugStatus`, bug);
  return result;
}
