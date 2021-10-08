import React from "react";
import Header from "./header";
const Dashboard = (props) => {
  return (
    <>
    <Header/>
       <h2>Private Dashboard</h2>
        Email: {props.payload.identifier}
    </>
  );
};
export default Dashboard;

