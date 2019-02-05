import React from 'react';
import useHover from './hooks/useHover';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [hoverRef, isHovered] = useHover();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} ref={hoverRef} className="App-logo" alt="logo" />
        <p>
          {isHovered ? '😁' : '☹️'}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
