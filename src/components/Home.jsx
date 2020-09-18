import React from "react";
import { Link } from "react-router-dom";
import team from "../images/team.svg";
function Home() {
  return (
    <div className='container'>
      <main className='heading'>
        <p>Catch all the Bugs.</p>
        <p>Collaborate with your team</p>
        <Link to='/signin'>
          <button>Get Started</button>
        </Link>
      </main>
      <img src={team} alt='team' />
    </div>
  );
}
export default Home;
