/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useState, useEffect } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import socketIOClient from 'socket.io-client';
import { GoComment, GoIssueOpened } from 'react-icons/go';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-tabs/style/react-tabs.css';
import { RiArrowDropDownFill } from 'react-icons/ri';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AddBug from './AddBug';
import { TeamContext } from '../providers/TeamProvider';
import Search from './common/search';

/**
 * TODO: (1) Make Users List scrollable. (2) Refactor the bugs list into separate component (3) Add Chat functionality.
 */

function UserDashboard() {
  const teamContext = useContext(TeamContext);
  const [sortByUser, setSortByUser] = useState('');
  const userList = [...teamContext.userList];
  let bugs = [];
  let orderedBugs = [];
  const orderedUserList = _.sortBy(userList, (o) => o.name);
  let openBugsCount = 0;
  let closeBugsCount = 0;
  const showSuccessNotification = (errorMsg) => {
    toast.success(`${errorMsg}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorNotification = (errorMsg) => {
    toast.error(`${errorMsg}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showInfoNotification = (errorMsg) => {
    toast.info(`${errorMsg}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    console.log(process.env.WS);
    const socket = socketIOClient(process.env.REACT_APP_WS);
    socket.on('add bug', (data) => {
      showSuccessNotification('New Bug added');
      teamContext.updateTeamState(data);
    });
    socket.on('delete bug', (data) => {
      showInfoNotification(`${data.message}`);
      console.log(data);
      teamContext.updateTeamState(data.team);
    });
    socket.on('comment', (data) => {
      teamContext.updateTeamState(data.team);
    });
    socket.on('bug', (data) => {
      showInfoNotification('Bug status was Changed');
      teamContext.updateTeamState(data.team);
    });
    return () => {
      socket.disconnect();
      socket.close();
    };
  }, [teamContext]);

  if (teamContext.currentTeam != null) {
    bugs = [...teamContext.currentTeam.bugs];
    if (sortByUser !== '') {
      if (sortByUser === 'All') {
        orderedBugs = bugs;
      } else {
        orderedBugs = _.filter(
          bugs,
          (bug) => bug.createdBy.name === sortByUser
        );
      }
    } else {
      orderedBugs = bugs;
    }

    openBugsCount = teamContext.currentTeam.bugs.filter(
      (bug) => bug.isOpen === true
    ).length;
    closeBugsCount = teamContext.currentTeam.bugs.filter(
      (bug) => bug.isOpen !== true
    ).length;
  }
  const setCurrentBug = (bug) => {
    window.localStorage.setItem('currentBug', JSON.stringify(bug));
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Zoom}
        pauseOnHover
      />
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
              <AddBug
                showSuccessNotification={showSuccessNotification}
                showErrorNotification={showErrorNotification}
              />
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
                      Users
                      <span>
                        <RiArrowDropDownFill />
                      </span>
                    </summary>
                    <details-menu>
                      <p>Filter by Users</p>
                      <ul>
                        <li onClick={() => setSortByUser('All')}>All User</li>
                        {orderedUserList.map((user) => (
                          <li
                            key={user._id}
                            onClick={() => setSortByUser(user.name)}
                          >
                            {user.name}
                          </li>
                        ))}
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
                        {orderedBugs.map((bug) =>
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
                                          notify: {
                                            showSuccessNotifictaion: showSuccessNotification,
                                            showErrorNotifictaion: showErrorNotification,
                                            showInfoNotifictaion: showInfoNotification,
                                          },
                                        }}
                                        onClick={() => setCurrentBug(bug)}
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
                        {orderedBugs.map((bug) =>
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
                                        }}
                                        onClick={() => setCurrentBug(bug)}
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
