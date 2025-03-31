import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import IdeaDescription from "./components/IdeaDescription";
import Options from "./components/Options";
import Missions from "./components/Missions";
import MissionDetails from "./components/MissionDetails";
import SoldierDetails from "./components/SoldierDetails";
import FutureMissions from "./components/FutureMissions";
import CurrentMissionStats from "./components/CurrentMissionStats";

const Home = () => (
  <>
    <IdeaDescription />
  </>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Options />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/mission-details/:id" element={<MissionDetails />} />
        <Route path="/soldier-details/:id" element={<SoldierDetails />} />
        <Route path="/future-missions" element={<FutureMissions />} />
        <Route
          path="/current-mission-stats"
          element={<CurrentMissionStats />}
        />
      </Routes>
    </Router>
  );
};

export default App;
