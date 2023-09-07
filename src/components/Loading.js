import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="container mt-4">
      <div className="loading-ssp">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
