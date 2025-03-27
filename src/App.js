import React from "react";
import PortfolioTracker from "./PortfolioTracker";
import "./App.css";  // ✅ Make sure App.css is imported

function App() {
  return (
    <div>
      <h1>🔴⚫ My Portfolio Tracker ⚫🔴</h1>
      <PortfolioTracker />
    </div>
  );
}

export default App;
