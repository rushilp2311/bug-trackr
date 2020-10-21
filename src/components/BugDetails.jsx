import React, { Component } from "react";
import { BiArrowBack } from "react-icons/bi";
import { TeamContext } from "../providers/TeamProvider";
import * as teamService from "../services/teamService";
import * as authService from "../services/authService";
import DeleteBug from "./DeleteBug";

class BugDetails extends Component {
  static contextType = TeamContext;
  state = {
    bug: {},
    data: {},
  };

  componentDidMount = async () => {
    const currentbug = this.props.location.state;

    const team = await teamService.getCurrentUserTeam(
      authService.getCurrentUser().team
    );
    const bug = team.bugs.find(b => b._id === currentbug._id);

    this.setState({ bug });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const user = authService.getCurrentUser();
    const currentbug = this.props.location.state;
    const comment = {
      comment: this.state.data.comment,
      email: user.email,
      teamid: user.team,
      bugid: currentbug._id,
    };
    const current = { ...this.state.bug };

    current.comments.push({
      comment: this.state.data.comment,
      createdBy: { _id: user._id, name: user.name },
    });

    const team = await teamService.addComment(comment);
    if (team != null) {
      const bugs = team.data.bugs;
      const bug = bugs.find(b => b._id === currentbug._id);

      this.setState({ bug });
      this.context.updateTeamState(team.data);
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  render() {
    const { bug } = this.state;
    const user = authService.getCurrentUser();

    return (
      <div className='bug__details__container'>
        <div className='bug__details__header'>
          <div className='bug__details__goback'>
            <a href='/'>
              <span>
                <BiArrowBack />
              </span>
              <p>Go Back</p>
            </a>
          </div>
          <hr />
          <div className='bug__details__title'>
            {bug.isOpen ? (
              <p>
                {bug.title} <span>Open</span>
              </p>
            ) : (
              <p>
                {bug.title} <span>Closed</span>
              </p>
            )}
            {bug.createdBy ? (
              <h6>
                Created by {bug.createdBy.name} on {bug.date.substring(0, 10)}
              </h6>
            ) : null}
          </div>
        </div>
        <div className='bug__details__description'>
          <h3>Description</h3>
          <hr />
          <p>{bug.description}</p>
        </div>

        <div className='bug__details__buttons'>
          {bug.createdBy ? (
            bug.createdBy.id === user._id ? (
              <DeleteBug bug={bug} />
            ) : null
          ) : null}
          <button className="close_btn">Close this bug</button>
        </div>
        <div className='bug__details__comments'>
          <div className='bug__details__comments__title'>
            <h3>Comment Section</h3>
          </div>
          <div className='bug__details__comments__add'>
            <input
              type='text'
              name='comment'
              onChange={this.handleChange}
              placeholder='Leave a Comment'
            />
            <button onClick={this.handleSubmit}> Add Comment </button>
          </div>
          <div className='bug__details__comments__list'>
            {bug.comments ? (
              <ul>
                {bug.comments.map(comment => {
                  return (
                    <li key={comment._id}>
                      <div className='comment__title'>{comment.comment}</div>
                      <div className='commented__by'>
                        Commented By {comment.createdBy.name} on{" "}
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
