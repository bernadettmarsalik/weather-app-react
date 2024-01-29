import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import DisplayWeather from "./components/DisplayWeather";

function App() {
  return (
    <div className="App">
      <DisplayWeather />
      <Footer />
    </div>
  );
}

export default App;
