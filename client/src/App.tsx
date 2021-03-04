import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import VideoWindow from './components/VideoWindow';
import logo from './assets/logo.png';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="HackGT-logo"/>
        <Router>
          <Switch>
            <Route path="/:id" children={<VideoWindow/>} />
            <Route path="/" children={<h1>Something went wrong, please try again or contact HackGT staff!</h1>} />
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
