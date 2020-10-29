import React, { useContext } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { GoComment, GoIssueOpened } from 'react-icons/go';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AddBug from './AddBug';
import { TeamContext } from '../providers/TeamProvider';
import Search from './common/search';

function UserDashboard() {
  const teamContext = useContext(TeamContext);
  let openBugsCount = 0;
  let closeBugsCount = 0;
  if (teamContext.currentTeam != null) {
    openBugsCount = teamContext.currentTeam.bugs.filter(
      (bug) => bug.isOpen === true
    ).length;
    closeBugsCount = teamContext.currentTeam.bugs.filter(
      (bug) => bug.isOpen !== true
    ).length;
  }
  return (
    <>
      {teamContext.currentTeam ? (
        <div className="dashboard__container">
          <div className="dashboard__header">
            <div className="team_name">
              <h2>
                <Link to="/teamdetails" style={{ color: '#001233' }}>
                  {teamContext.currentTeam.name}
                </Link>
              </h2>
            </div>
            <div className="dashboard__controls">
              <Search />
              <AddBug />
            </div>
          </div>
          <div className="dashboard__body">
            <Tabs>
              <div className="dashboard__info">
                <div className="dashboard__bugstatus">
                  <TabList>
                    <Tab>
                      <span className="open__bugs">
                        <span>
                          <GoIssueOpened />
                        </span>{' '}
                        {openBugsCount} Open
                      </span>
                    </Tab>
                    <Tab>
                      <span className="closed__bugs">
                        <span>
                          <FcCheckmark />
                        </span>{' '}
                        {closeBugsCount} Closed
                      </span>
                    </Tab>
                  </TabList>
                </div>
                <div className="dashboard__filters">
                  <details>
                    <summary role="button">
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
                    <summary role="button">
                      Sort
                      <span>
                        <RiArrowDropDownFill />{' '}
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

              <div className="dashboard__bugslist">
                <ul>
                  <TabPanel>
                    {openBugsCount === 0 ? (
                      <div className="no__bugs">
                        <h1>No Open Bugs</h1>
                      </div>
                    ) : (
                      <>
                        {teamContext.currentTeam.bugs.map((bug) =>
                          bug.isOpen ? (
                            <li className="bugs__list" key={bug._id}>
                              <div className="bugs__list__content">
                                <div className="bugs__list__info__header">
                                  <span>
                                    <GoIssueOpened />
                                  </span>
                                  <div className="bugs__list__headers">
                                    <p className="header">
                                      <Link
                                        to={{
                                          pathname: '/bugdetails',
                                          state: bug,
                                        }}
                                        style={{ color: '#001233' }}
                                      >
                                        {bug.title}
                                      </Link>
                                    </p>
                                    <p className="subheader">
                                      {` Opened on
                                      ${bug.date.slice(0, 10)} by 
                                      ${bug.createdBy.name}`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="bugs__list__comments">
                                <p>
                                  <span>
                                    <GoComment />
                                  </span>{' '}
                                  {bug.comments.length}
                                </p>
                              </div>
                            </li>
                          ) : null
                        )}
                      </>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {closeBugsCount === 0 ? (
                      <div className="no__bugs">
                        <h1>No Closed Bug Reported</h1>
                      </div>
                    ) : (
                      <>
                        {teamContext.currentTeam.bugs.map((bug) =>
                          bug.isOpen === false ? (
                            <li className="bugs__list" key={bug._id}>
                              <div className="bugs__list__content">
                                <div className="bugs__list__info__header">
                                  <span>
                                    <FcCheckmark />
                                  </span>
                                  <div className="bugs__list__headers">
                                    <p className="header">
                                      <Link
                                        to={{
                                          pathname: '/bugdetails',
                                          state: bug,
                                        }}
                                        style={{ color: '#001233' }}
                                      >
                                        {bug.title}
                                      </Link>
                                    </p>
                                    <p className="subheader">
                                      {` Opened on
                                      ${bug.date.slice(0, 10)} by 
                                      ${bug.createdBy.name}`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="bugs__list__comments">
                                <p>
                                  <span>
                                    <GoComment />
                                  </span>{' '}
                                  {bug.comments.length}
                                </p>
                              </div>
                            </li>
                          ) : null
                        )}
                      </>
                    )}
                  </TabPanel>
                </ul>
              </div>
            </Tabs>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UserDashboard;
