import React from 'react';

import './App.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'

// a little bee ascii art 
const art = ".' '.                             buzz buzz\n.        .   .           (__\\ \n .         .         . -{{_(|8)\n   ' .  . ' ' .  . '     (__/"

const App: React.FC = () => {
  console.log(art);
  return (
    <div className="app_main">
      <Router>
          <Switch>
            <Route path="/" children={
              <div>
                <Navbar />
                <Home />
              </div>
            } />          
          </Switch>
        </Router>
    </div>
  );
};

export default App;
