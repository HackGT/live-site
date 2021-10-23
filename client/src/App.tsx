import React from 'react';

import './App.css';
import { User } from './types/User';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import ScheduleTab from './components/ScheduleTab';
import InfoTab from './components/InfoTab'
import TracksTab from './components/TracksTab';
import PrizesTab from './components/PrizesTab'
import MentorTab from './components/MentorTab';
import SponsorTab from './components/SponsorTab'
import Footer from './components/Footer';
import useAxios from "axios-hooks";

// a little bee ascii art 
const art = ".' '.                             buzz buzz\n.        .   .           (__\\ \n .         .         . -{{_(|8)\n   ' .  . ' ' .  . '     (__/"

// TODO: Add Hexlabs information at the bottom of the page

const App: React.FC = () => {

  const [{ data, loading, error }] = useAxios("/auth/check");


  if (loading) {
    return null;
  }

  if (error || (!data)) {
    return <h1>Error</h1>;
  }

  const user: User = data;

  console.log(art);

  if (user.branch=='notconfirmed') {
    return (
      <div className="app_main">
        <div className="top-lights"></div>
        <div className="middle-lights"></div>
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
              <Route path="/mentors" children={
                <div>
                  <Navbar />
                  <MentorTab />
                  <Footer />
                </div>
              } />
              <Route path="/sponsors" children={
                <div>
                  <Navbar />
                  <SponsorTab />
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
                  <ScheduleTab virtual={true}/>
                  <Footer />
                </div>
              } />    
              <Route path="/" children={
                <div>
                  <Navbar />
                  <Home virtual={true} confirmed={false}/>
                  <Footer />
                </div>
              } />          
            </Switch>
          </Router>
        </div>
      );
  } else if (user.branch=="Participant-Emerging Virtual" ||  user.branch=="Participant-General Virtual") {
    return (
      <div className="app_main">
        <div className="top-lights"></div>
        <div className="middle-lights"></div>
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
              <Route path="/mentors" children={
                <div>
                  <Navbar />
                  <MentorTab />
                  <Footer />
                </div>
              } />
              <Route path="/sponsors" children={
                <div>
                  <Navbar />
                  <SponsorTab />
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
                  <ScheduleTab virtual={true}/>
                  <Footer />
                </div>
              } />    
              <Route path="/" children={
                <div>
                  <Navbar />
                  <Home virtual={true} confirmed={true}/>
                  <Footer />
                </div>
              } />          
            </Switch>
          </Router>
      </div>
    );
  } else {
  return (
    <div className="app_main">
      <div className="top-lights"></div>
      <div className="middle-lights"></div>
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
            <Route path="/mentors" children={
              <div>
                <Navbar />
                <MentorTab />
                <Footer />
              </div>
            } />
            <Route path="/sponsors" children={
              <div>
                <Navbar />
                <SponsorTab />
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
                <ScheduleTab virtual={false}/>
                <Footer />
              </div>
            } />    
            <Route path="/" children={
              <div>
                <Navbar />
                <Home virtual={true} confirmed={true}/>
                <Footer />
              </div>
            } />          
          </Switch>
        </Router>
      </div>
    );

  }


};

export default App;
