import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import V2 from "./V2.jsx"; // 👈 importaremos la nueva página
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/v2" element={<V2 />} /> {/* 👈 nueva ruta */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

