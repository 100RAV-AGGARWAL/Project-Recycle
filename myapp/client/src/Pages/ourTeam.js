import React, { Component } from "react";

import HeaderAboutUs from "../Components/headerAboutUs";

class ourTeam extends Component {
  render() {
    return (
      <div>
        <HeaderAboutUs />
        <div className = "ourTeam">
          <ul className = "teamMembers">
            <li className = "teamMember">Laskhay</li>
            <li className = "teamMember">Nishant</li>
            <li className = "teamMember">Sourav</li>
            <li className = "teamMember">Aakash</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ourTeam;
