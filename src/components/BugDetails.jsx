import React, { Component } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

class BugDetails extends Component {
  render() {
    const bug = this.props.location.state;

    return (
      <div className='bug__details__container'>
        <div className='bug__details__header'>
          <div className='bug__details__goback'>
            <Link to='/'>
              <span>
                <BiArrowBack />
              </span>
              <p>Go Back</p>
            </Link>
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
            <h6>
              Created by {bug.createdBy.name} on {bug.date.substring(0, 10)}
            </h6>
          </div>
        </div>
        <div className='bug__details__description'>
          <h3>Description</h3>
          <hr />
          <p>{bug.description}</p>
        </div>
        <div className='bug__details__comments'>
          <div className='bug__details__comments__title'>
            <h3>Comment Section</h3>
          </div>
          <div className='bug__details__comments__add'>
            <input type='text' placeholder='Leave a Comment' />
            <button> Add Comment </button>
          </div>
          <div className='bug__details__comments__list'>
            <ul>
              {bug.comments.map(comment => (
                <li key={comment._id}>{comment.comment}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BugDetails;
