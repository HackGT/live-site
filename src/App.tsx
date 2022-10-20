/* eslint-disable react/no-children-prop */
import React from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/shared/Navbar";
import TracksTab from "./components/tabs/tracks/TracksTab";
import MentorTab from "./components/tabs/mentor/MentorTab";
import Footer from "./components/shared/Footer";
import SwagTab from "./components/tabs/swag/SwagTab";
import WorkshopTab from "./components/tabs/workshops/WorkshopTab";
import HardwareMakerspaceTab from "./components/tabs/hardware-makerspace/HardwareMakerspaceTab";
import SponsorTab from "./components/tabs/sponsor/SponsorTab";
import AccommodationsTab from "./components/tabs/accommodations/AccommodationsTab";
import HackGT9HomeTab from "./components/tabs/home/HackGT9Home";

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

  return (
    <div className="app_main">
      <div className="top-lights" />
      <div className="middle-lights" />
      <Router>
        <Navbar />
        <Switch>
          <Route path="/tracks-challenges" children={<TracksTab />} />
          <Route path="/mentors" children={<MentorTab />} />
          <Route path="/swag" children={<SwagTab />} />
          <Route path="/workshops" children={<WorkshopTab />} />
          <Route path="/hardware-makerspace" children={<HardwareMakerspaceTab />} />
          <Route path="/sponsor" children={<SponsorTab />} />
          <Route path="/accomodations" children={<AccommodationsTab />} />
          <Route path="/" children={<HackGT9HomeTab />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
