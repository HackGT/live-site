import React from 'react';

import './App.css';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import ScheduleTab from './components/ScheduleTab';
import InfoTab from './components/InfoTab'
import TracksTab from './components/TracksTab';
import PrizesTab from './components/PrizesTab'
import Footer from './components/Footer';

// a little bee ascii art 
const art = ".' '.                             buzz buzz\n.        .   .           (__\\ \n .         .         . -{{_(|8)\n   ' .  . ' ' .  . '     (__/"

// TODO: Add Hexlabs information at the bottom of the page

const App: React.FC = () => {
  console.log(art);
  return (
    <div className="app_main">
      <Router>
          <Switch>
            <Route path="/info" children={
              <div>
                <Navbar />
                <InfoTab />
                <Footer />
              </div>
            } />
            <Route path="/tracks" children={
              <div>
                <Navbar />
                <TracksTab />
                <Footer />
              </div>
            } />
            <Route path="/prizes" children={
              <div>
                <Navbar />
                <PrizesTab />
                <Footer />
              </div>
            } />
            <Route path="/schedule" children={
              <div>
                <Navbar />
                <ScheduleTab />
                <Footer />
              </div>
            } />    
            <Route path="/" children={
              <div>
                <Navbar />
                <Home />
                <Footer />
              </div>
            } />          
          </Switch>
        </Router>
    </div>
  );
};

export default App;
