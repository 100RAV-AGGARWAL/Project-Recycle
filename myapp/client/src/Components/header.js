import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Header() {
  const history = useHistory();

  const routeChange = () =>{ 
    let path = `/ourTeam`; 
    history.push(path);
  }
  return (
    <header id="header" class="fixed-top">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <h1 class="logo me-auto me-lg-0">
          <a href="index.html">Virtual Beings</a>
        </h1>

        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
                <li><a class="active">Home</a></li>
                <li><a onClick = {routeChange}>Our Team</a></li>
              </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
}

export default Header;
