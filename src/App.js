import React from "react";
import Header from "./components/Header";
import bugImage from "./images/main.svg";
import "./styles/app.scss";
function App() {
  return (
    <div className='app'>
      <Header />
      <div className='container'>
        <main className='heading'>
          <p>Catch all the Bugs.</p>
          <p>Collaborate with your team</p>
          <button>Get Started</button>
        </main>
        <img src={bugImage} alt='main' />
      </div>
    </div>
  );
}

export default App;
