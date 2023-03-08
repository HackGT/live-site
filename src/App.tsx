/* eslint-disable */
import React from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import useAxios from "axios-hooks"
import { initializeApp } from "firebase/app";
import { setPersistence, getAuth, inMemoryPersistence } from "firebase/auth";
import { useLogin, LoadingScreen, AuthProvider, useAuth, Service, apiUrl, Footer, ErrorScreen } from "@hex-labs/core";

import Navbar from "./components/shared/Navbar";
import TracksTab from "./components/tabs/tracks/TracksTab";
import MentorTab from "./components/tabs/mentor/MentorTab";
import SwagTab from "./components/tabs/swag/SwagTab";
import WorkshopTab from "./components/tabs/workshops/WorkshopTab";
import HardwareMakerspaceTab from "./components/tabs/hardware-makerspace/HardwareMakerspaceTab";
import SponsorTab from "./components/tabs/sponsor/SponsorTab";
import AccommodationsTab from "./components/tabs/accommodations/AccommodationsTab";
import HackGT9HomeTab from "./components/tabs/home/HackGT9Home";
import ScheduleTab from "./components/tabs/schedule/ScheduleTab";
import AdminTab from "./components/tabs/admin/AdminTab";
import { Box } from "@chakra-ui/react";
import JudgingTab from "./components/tabs/judging/JudgingTab";
import EventsTab from "./components/tabs/admin/events/EventsTable"
import EditEntry from "./components/tabs/admin/events/EditEntry"
import UsersTable from "./components/swag/UsersTable"

// a little bee ascii art
const art =
  ".' '.                             buzz buzz\n.        .   .           (__\\ \n .         .         . -{{_(|8)\n   ' .  . ' ' .  . '     (__/";

// Initialized the Firebase app through the credentials provided
export const app = initializeApp({
  apiKey: "AIzaSyCsukUZtMkI5FD_etGfefO4Sr7fHkZM7Rg",
  authDomain: "auth.hexlabs.org",
});
export const HEXATHON_ID = "62d9ed68d0a69b88c06bdfb2";
// Sets the Firebase persistence to in memory since we use cookies for session
// management. These cookies are set by the backend on login/logout.
setPersistence(getAuth(app), inMemoryPersistence);

// By default sends axios requests with user session cookies so that the backend
// can verify the user's identity.
axios.defaults.withCredentials = true;

export const App = () => {
  // Retrieves the user's login state. This hook will also make requests to log
  // the user in
  const [loading, loggedIn] = useLogin(app);

  // If loading, show a loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // If the user is not logged in, redirect to the login frontend with a redirect
  // param so that the user can login and come back to the page they were on.
  if (!loggedIn) {
    window.location.href = `https://login.hexlabs.org?redirect=${window.location.href}`;
    return <LoadingScreen />;
  }

  // Sets up the AuthProvider so that any part of the application can use the
  // useAuth hook to retrieve the user's login details.
  return (
    <AuthProvider app={app}>
      <div className="app_main">
        <div className="top-lights" />
        <div className="middle-lights" />
        <Navbar />
        <Routes>
          <Route path="/tracks-challenges" element={<TracksTab />} />
          <Route path="/schedule" element={<ScheduleTab virtual={false} />} />
          <Route path="/mentors" element={<MentorTab />} />
          <Route path="/swag" element={<SwagTab />} />
          <Route path="/workshops" element={<WorkshopTab />} />
          <Route path="/hardware-makerspace" element={<HardwareMakerspaceTab />} />
          <Route path="/sponsor" element={<SponsorTab />} />
          <Route path="/accomodations" element={<AccommodationsTab />} />
          <Route path="/judging" element={<JudgingTab />} />
          <Route path="/admin/events" element={<EventsTab />} />
          <Route path="admin/events/:id" element={<EditEntry name="Events"/>} />
          <Route path="/" element={<HackGT9HomeTab />} />
          <Route path="/admin" element={<AdminTab />} />
          <Route path="/swag/item-checkout" element={<UsersTable />} />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
};

export default App;
