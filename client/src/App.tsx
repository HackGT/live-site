import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import VideoWindow from './components/VideoWindow';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/:id" children={<VideoWindow/>} />
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
