import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import "./styles.css";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ScrollToTop></ScrollToTop>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/project/:id" element={<ProjectPage />} />
    </Routes>
  </BrowserRouter>,
);
