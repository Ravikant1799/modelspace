import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ModelSpacePage from "./components/ModelSpacePage";
import NotFound from "./components/NotFound";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/model-space/:id" element={<ModelSpacePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
