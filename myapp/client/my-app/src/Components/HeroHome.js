import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class HeroHome extends Component {
  render() {
    return (
      <section id="hero" class="d-flex align-items-center">
        <div
          class="container d-flex flex-column align-items-center"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <h1>Project Recycle</h1>
          <h2></h2>
          <a href="about.html" class="btn-login">
            Login
          </a>
          <a href="about.html" class="btn-login">
            Sign Up
          </a>
        </div>
      </section>
    );
  }
}
export default HeroHome;
