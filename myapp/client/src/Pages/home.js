import React, { Component } from "react";

import Header from "../Components/header";
import Footer from "../Components/footer";
import HeroHome from "../Components/HeroHome";

class home extends Component {
  render() {
    return (
      <div>
        <Header />
        <HeroHome />
        <Footer />
      </div>
    );
  }
}
export default home;
