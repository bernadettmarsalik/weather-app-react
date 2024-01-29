import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DisplayWeather from "./components/DisplayWeather";

function App() {
  return (
    <div className="App">
      <div
        className="d-flex flex-column justify-content-between align-items-center h-100 w-100"
        id="apps"
      >
        <Header />
        <DisplayWeather />
        <Footer />
      </div>
    </div>
  );
}

export default App;
