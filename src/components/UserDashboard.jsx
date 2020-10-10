import React, { Component } from "react";
import { FcSearch, FcCheckmark } from "react-icons/fc";
import { GoIssueOpened, GoComment } from "react-icons/go";

import { RiArrowDropDownFill } from "react-icons/ri";
import { TeamContext } from "../providers/TeamProvider";

class UserDashboard extends Component {
  render() {
    return (
      <div className='dashboard__container'>
        <div className='dashboard__header'>
          <div className='team_name'>
            <TeamContext.Consumer>
              {currentTeam => (
                <div>
                  {currentTeam.currentTeam.name}
                  {console.log(currentTeam.currentTeam.team)}
                </div>
              )}
            </TeamContext.Consumer>
          </div>
          <div className='dashboard__controls'>
            <input
              type='text'
              name='search'
              id='bug_search'
              aria-label='Search all bugs'
              placeholder='Search all bugs'
            />
            <FcSearch className='search_logo' />
            <button className='dashboard__controls__button'>New Bug</button>
          </div>
        </div>
        <div className='dashboard__body'>
          <div className='dashboard__info'>
            <div className='dashboard__bugstatus'>
              <div className='open__bugs'>
                <span>
                  <GoIssueOpened />
                </span>{" "}
                10 Open
              </div>
              <div className='closed__bugs'>
                <span>
                  <FcCheckmark />
                </span>{" "}
                11 Closed
              </div>
            </div>
            <div className='dashboard__filters'>
              <details>
                <summary role='button'>
                  Author
                  <span>
                    <RiArrowDropDownFill />
                  </span>
                </summary>
                <details-menu>
                  <ul>
                    <li>Author 1</li>
                    <li>Author 2</li>
                    <li>Author 3</li>
                    <li>Author 4</li>
                    <li>Author 5</li>
                  </ul>
                </details-menu>
              </details>
              <details>
                <summary role='button'>
                  Sort
                  <span>
                    <RiArrowDropDownFill />{" "}
                  </span>
                </summary>
                <details-menu>
                  <ul>
                    <li>Newest</li>
                    <li>Oldest</li>
                    <li>Most Commented</li>
                  </ul>
                </details-menu>
              </details>
            </div>
          </div>
          <div className='dashboard__bugslist'>
            <ul>
              <li className='bugs__list'>
                <div className='bugs__list__content'>
                  <div className='bugs__list__info__header'>
                    <span>
                      <GoIssueOpened />
                    </span>
                    <div className='bugs__list__headers'>
                      <p className='header'>
                        This is the First Bug of Your Application
                      </p>
                      <p className='subheader'>
                        Opened on 4/10/2020 by Rushil Patel
                      </p>
                    </div>
                  </div>
                </div>
                <div className='bugs__list__comments'>
                  <p>
                    <span>
                      <GoComment />
                    </span>{" "}
                    1
                  </p>
                </div>
              </li>
              <li className='bugs__list'>
                <div className='bugs__list__content'>
                  <div className='bugs__list__info__header'>
                    <span>
                      <GoIssueOpened />
                    </span>
                    <div className='bugs__list__headers'>
                      <p className='header'>
                        This is the Second Bug of Your Application
                      </p>
                      <p className='subheader'>
                        Opened on 4/10/2020 by Krutarth Patel
                      </p>
                    </div>
                  </div>
                </div>
                <div className='bugs__list__comments'>
                  <p>
                    <span>
                      <GoComment />
                    </span>{" "}
                    1
                  </p>
                </div>
              </li>
              <li className='bugs__list'>
                <div className='bugs__list__content'>
                  <div className='bugs__list__info__header'>
                    <span>
                      <GoIssueOpened />
                    </span>
                    <div className='bugs__list__headers'>
                      <p className='header'>
                        This is the Third Bug of Your Application
                      </p>
                      <p className='subheader'>
                        Opened on 4/10/2020 by Parth Patel
                      </p>
                    </div>
                  </div>
                </div>
                <div className='bugs__list__comments'>
                  <p>
                    <span>
                      <GoComment />
                    </span>{" "}
                    1
                  </p>
                </div>
              </li>
              <li className='bugs__list'>
                <div className='bugs__list__content'>
                  <div className='bugs__list__info__header'>
                    <span>
                      <GoIssueOpened />
                    </span>
                    <div className='bugs__list__headers'>
                      <p className='header'>
                        This is the Fourth Bug of Your Application
                      </p>
                      <p className='subheader'>
                        Opened on 4/10/2020 by Jeel Patel
                      </p>
                    </div>
                  </div>
                </div>
                <div className='bugs__list__comments'>
                  <p>
                    <span>
                      <GoComment />
                    </span>{" "}
                    1
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
