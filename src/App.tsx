import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { setPersistence, getAuth, inMemoryPersistence } from "firebase/auth";
import { useLogin, LoadingScreen, AuthProvider, Footer } from "@hex-labs/core";

import Navbar from "./components/shared/Navbar";
import TracksTab from "./components/tabs/tracks/TracksTab";
import MentorTab from "./components/tabs/mentor/MentorTab";
import SwagTab from "./components/tabs/swag/SwagTab";
import WorkshopTab from "./components/tabs/workshops/WorkshopTab";
import HardwareMakerspaceTab from "./components/tabs/hardware-makerspace/HardwareMakerspaceTab";
import SponsorTab from "./components/tabs/sponsor/SponsorTab";
import AccommodationsTab from "./components/tabs/accommodations/AccommodationsTab";
import HexathonHomeTab from "./components/tabs/home/HexathonHome";
import ScheduleTab from "./components/tabs/schedule/ScheduleTab";
import AdminTab from "./components/tabs/admin/AdminTab";
import JudgingTab from "./components/tabs/judging/JudgingTab";
import EventsTab from "./components/tabs/admin/events/EventsTable"
import EditEntry from "./components/tabs/admin/events/EditEntry"
import BlocksTab from "./components/tabs/admin/blocks/BlockTable";
import EditBlock from "./components/tabs/admin/blocks/EditEntry"

// a little bee ascii art
// const art =
//   ".' '.                             buzz buzz\n.        .   .           (__\\ \n .         .         . -{{_(|8)\n   ' .  . ' ' .  . '     (__/";

// Initialized the Firebase app through the credentials provided
export const app = initializeApp({
  apiKey: "AIzaSyCsukUZtMkI5FD_etGfefO4Sr7fHkZM7Rg",
  authDomain: "auth.hexlabs.org",
});
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
      <Navbar />
      <Routes>
        <Route path="/tracks-challenges" element={<TracksTab />} />
        {/* <Route path="/schedule" element={<ScheduleTab virtual={false} />} /> */}
        {/* <Route path="/mentors" element={<MentorTab />} /> */}
        {/* <Route path="/swag" element={<SwagTab />} /> */}
        {/* <Route path="/workshops" element={<WorkshopTab />} /> */}
        {/* <Route path="/hardware-makerspace" element={<HardwareMakerspaceTab />} /> */}
        {/* <Route path="/sponsor" element={<SponsorTab />} /> */}
        {/* <Route path="/accomodations" element={<AccommodationsTab />} /> */}
        <Route path="/judging" element={<JudgingTab />} />
        <Route path="/admin/events" element={<EventsTab />} />
        <Route path="admin/events/:id" element={<EditEntry name="Events"/>} />
        <Route path="/" element={<HexathonHomeTab />} />
        <Route path="/admin" element={<AdminTab />} />
        <Route path="/admin/blocks" element={<BlocksTab />} />
        <Route path="admin/blocks/:id" element={<EditBlock name="Blocks"/>} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

export default App;
