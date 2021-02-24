import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// components
import YoutubeWrapper from './components/YoutubeWrapper';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/:id" children={<YoutubeWrapper/>} />
          </Switch>
        </Router>
      </header>
    </div>
  );
};

export default App;
