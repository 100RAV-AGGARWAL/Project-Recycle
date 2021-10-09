import React from "react";
const Dashboard = (props) => {
  return (
    <div className="dashboard d-flex align-items-center">
      <header id="header" class="fixed-top">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <h1 class="logo me-auto me-lg-0">
            <a href="index.html">Private Dashboard</a>
          </h1>

          <a class="email">Email: {props.payload.identifier}</a>
        </div>
      </header>
      <div className="login-success">
        <div className="login-text">Login Successful</div>

        <a className="btn code-btn">Generate Code</a>
      </div>
    </div>
  );
};
export default Dashboard;
