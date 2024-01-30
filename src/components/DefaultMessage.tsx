import React from "react";

const DefaultMessage: React.FC = () => (
  <div className="defaultMessage my-3">
    <div
      className="bg-transparent p-3 mb-3 rounded-5 shadow w-100 fs-4 text-light"
      style={{
        backdropFilter: "blur(10px)",
        height: "150px",
      }}
    >
      <p>Enter a city or click 'Locate me' to get weather information.</p>
    </div>
  </div>
);

export default DefaultMessage;
