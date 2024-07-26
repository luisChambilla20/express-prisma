import React from "react";
import { createRoot } from "react-dom/client";
import { FirstApp } from "./FirstApp";
import { CounterApp } from "./CounterApp";
import "./style.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CounterApp value={10}></CounterApp>
  </React.StrictMode>
);
