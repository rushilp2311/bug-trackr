import React, { Component } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import socketIOClient from 'socket.io-client';
import { TiDeleteOutline } from 'react-icons/ti';
import { TeamContext } from '../providers/TeamProvider';
import * as teamService from '../services/teamService';
import * as authService from '../services/authService';
import DeleteBug from './DeleteBug';

class BugDetails extends Component {
  static contextType = TeamContext;

  constructor(props) {
    super(props);

    this.state = {
      bug: {},
      data: {},
    };
  }

  componentDidMount = async () => {
    const { location } = this.props;
    const currentbug = location.state;
    this.setState({ bug: currentbug });
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
    socket.on('comment', (data) => {
      console.log(data);
      this.setState({ bug: data });
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { data, bug } = this.state;

    const { comment } = data;
    const { updateTeamState } = this.context;

    if (comment) {
      const user = authService.getCurrentUser();

      const currentcomment = {
        comment: comment,
        email: user.email,
        teamid: user.team,
        bugid: bug._id,
      };

      const current = { ...bug };
      current.comments.push({
        comment: comment,
        createdBy: { _id: user._id, name: user.name },
      });

      const team = await teamService.addComment(currentcomment);
      if (team != null) {
        const { bugs } = team.data;
        const currentBug = bugs.find((b) => b._id === bug._id);
        this.setState({ bug: currentBug });
        updateTeamState(team.data);
      }

      document.getElementById('comment').value = '';
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const { data } = this.state;
    const currentData = { ...data };
    currentData[input.name] = input.value;
    this.setState({ data: currentData });
  };

  handleDeleteComment = async (commentid) => {
    const user = authService.getCurrentUser();
    const { bug } = this.state;
    const { updateTeamState } = this.context;

    const deleteComment = {
      teamid: user.team,
      bugid: bug._id,
      commentid: commentid,
    };
    const team = await teamService.deleteComment(deleteComment);
    if (team != null) {
      // const { bugs } = team.data;
      // this.setState({ bug: bugs.find((b) => b._id === bug._id) });

      updateTeamState(team.data);
    }
  };

  handleChangeBugStatus = async (e) => {
    e.preventDefault();
    const user = authService.getCurrentUser();
    const { bug } = this.state;
    const { updateTeamState } = this.context;

    const changeBug = {
      teamid: user.team,
      bugid: bug._id,
    };

    const team = await teamService.updateBugStatus(changeBug);
    if (team != null) {
      const { bugs } = team.data;
      this.setState({ bug: bugs.find((b) => b._id === bug._id) });
      updateTeamState(team.data);
    }
  };

  render() {
    const { bug } = this.state;
    const user = authService.getCurrentUser();

    return (
      <div className="bug__details__container">
        <div className="bug__details__header">
          <div className="bug__details__goback">
            <a href="/">
              <span>
                <BiArrowBack />
              </span>
              <p>Go Back</p>
            </a>
          </div>
          <hr />
          <div className="bug__details__title">
            {bug.isOpen ? (
              <p>
                {bug.title} <span>Open</span>
              </p>
            ) : (
              <p>
                {bug.title}{' '}
                <span style={{ background: '#c82333' }}>Closed</span>
              </p>
            )}
            {bug.createdBy ? (
              <h6>
                Created by {bug.createdBy.name} on {bug.date.substring(0, 10)}
              </h6>
            ) : null}
          </div>
        </div>
        <div className="bug__details__description">
          <h3>Description</h3>
          <hr />
          <p>{bug.description}</p>
        </div>

        <div className="bug__details__buttons">
          {bug.createdBy ? (
            bug.createdBy.id === user._id ? (
              <DeleteBug bug={bug} />
            ) : null
          ) : null}
          {bug.isOpen ? (
            <button className="close_btn" onClick={this.handleChangeBugStatus}>
              Close this bug
            </button>
          ) : (
            <button className="reopen_btn" onClick={this.handleChangeBugStatus}>
              Re open this bug
            </button>
          )}
        </div>
        <div className="bug__details__comments">
          <div className="bug__details__comments__title">
            <h3>Comment Section</h3>
          </div>
          <div className="bug__details__comments__add">
            <input
              type="text"
              name="comment"
              id="comment"
              onChange={this.handleChange}
              placeholder="Leave a Comment"
            />
            <button onClick={this.handleSubmit}> Add Comment </button>
          </div>
          <div className="bug__details__comments__list">
            {bug.comments ? (
              <ul>
                {bug.comments.map((comment) => {
                  return (
                    <li key={comment._id}>
                      <div className="comment__title">
                        {comment.comment}{' '}
                        {authService.getCurrentUser()._id ===
                        comment.createdBy.id ? (
                          <span
                            onClick={() =>
                              this.handleDeleteComment(comment._id)
                            }
                          >
                            <TiDeleteOutline />
                          </span>
                        ) : null}
                      </div>
                      <div className="commented__by">
                        Commented By {comment.createdBy.name} on{' '}
                        {comment.date.substring(0, 10)}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default BugDetails;
