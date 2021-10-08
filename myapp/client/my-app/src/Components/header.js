import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
 
class Header extends Component {
    render() {
        return (
          <header id="header" class="fixed-top">
            <div class="container-fluid d-flex justify-content-between align-items-center">

            <h1 class="logo me-auto me-lg-0"><a href="index.html">Virtual Beings</a></h1>
      
            <nav id="navbar" class="navbar order-last order-lg-0">
              <ul>
                <li><a class="active" href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="resume.html">Login/Sign Up</a></li>
                <li><a href="services.html">Code Generator</a></li>
                {/* <li><a href="portfolio.html">Portfolio</a></li>
                <li><a href="contact.html">Contact</a></li> */}
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
      
            {/* <div class="header-social-links">
              <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
              <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
            </div> */}
      
          </div>
          </header>
      
)
    }
}
export default Header;