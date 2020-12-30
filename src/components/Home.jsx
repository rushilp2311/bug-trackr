import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import team from '../images/team.svg';
import '../styles/app.scss';

/**
 * TODO: Add Dark Mode.
 */

function Home() {
  useEffect(() => {
    document.title = 'Home | BugTrackr';
  }, []);

  return (
    <div className="main__header">
      <main className="heading">
        <p>Catch all the Bugs.</p>
        <p>Collaborate with your team</p>
        <Link to="/signin">
          <button className="btn">Get Started</button>
        </Link>
      </main>
      <img src={team} alt="team" />
    </div>
  );
}
export default Home;
