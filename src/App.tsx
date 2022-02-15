/* eslint-disable react/no-children-prop */
import React from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAxios from "axios-hooks";

import { User } from "./types/User";
import Navbar from "./components/shared/Navbar";
import Home from "./components/tabs/home/Home";
import ScheduleTab from "./components/tabs/schedule/ScheduleTab";
import InfoTab from "./components/tabs/info/InfoTab";
import TracksTab from "./components/tabs/tracks/TracksTab";
import PrizesTab from "./components/tabs/prizes/PrizesTab";
import MentorTab from "./components/tabs/mentor/MentorTab";
import SponsorTab from "./components/tabs/sponsor/SponsorTab";
import Footer from "./components/shared/Footer";

// a little bee ascii art
const art =
  ".' '.                             buzz buzz\n.        .   .           (__\\ \n .         .         . -{{_(|8)\n   ' .  . ' ' .  . '     (__/";

// TODO: Add Hexlabs information at the bottom of the page

const App: React.FC = () => {
  // Temporarily remove this code while login is switch to new system with api repo

  // const [{ data, loading, error }] = useAxios("/auth/check");

  // if (loading) {
  //   return null;
  // }

  // if (error || !data) {
  //   return <h1>Error</h1>;
  // }

  // const user: User = data;

  // console.log(art);

  const user = {
    branch: "notconfirmed",
  };

  if (user.branch == "notconfirmed") {
    return (
      <div className="app_main">
        <div className="top-lights" />
        <div className="middle-lights" />
        <Router>
          <Navbar />
          <Switch>
            <Route path="/info" children={<InfoTab />} />
            <Route path="/tracks" children={<TracksTab />} />
            <Route path="/mentors" children={<MentorTab />} />
            <Route path="/sponsors" children={<SponsorTab />} />
            <Route path="/prizes" children={<PrizesTab />} />
            <Route path="/schedule" children={<ScheduleTab virtual />} />
            <Route path="/" children={<Home virtual confirmed={false} />} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
  if (
    user.branch === "Participant-Emerging Virtual" ||
    user.branch === "Participant-General Virtual"
  ) {
    return (
      <div className="app_main">
        <div className="top-lights" />
        <div className="middle-lights" />
        <Router>
          <Navbar />
          <Switch>
            <Route path="/info" children={<InfoTab />} />
            <Route path="/tracks" children={<TracksTab />} />
            <Route path="/mentors" children={<MentorTab />} />
            <Route path="/sponsors" children={<SponsorTab />} />
            <Route path="/prizes" children={<PrizesTab />} />
            <Route path="/schedule" children={<ScheduleTab virtual />} />
            <Route path="/" children={<Home virtual confirmed />} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
  return (
    <div className="app_main">
      <div className="top-lights" />
      <div className="middle-lights" />
      <Router>
        <Navbar />
        <Switch>
          <Route path="/info" children={<InfoTab />} />
          <Route path="/tracks" children={<TracksTab />} />
          <Route path="/mentors" children={<MentorTab />} />
          <Route path="/sponsors" children={<SponsorTab />} />
          <Route path="/prizes" children={<PrizesTab />} />
          <Route path="/schedule" children={<ScheduleTab virtual={false} />} />
          <Route path="/" children={<Home virtual confirmed />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
