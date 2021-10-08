import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function HeroHome() {
  const history = useHistory();

  const routeChange = () =>{ 
    let path = `/:login`; 
    history.push(path);
  }
  return (
    <section id="hero" class="d-flex align-items-center">
        <div
          class="container d-flex flex-column align-items-center"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <h1>Project Recycle</h1>
          <h2></h2>
          <a class="btn-login" onClick={routeChange}>
            Login/Sign Up
          </a>
          {/* <a class="btn-login" onClick={routeChange}>
            Sign Up
          </a> */}
        </div>
      </section>
  )

}
export default HeroHome;
