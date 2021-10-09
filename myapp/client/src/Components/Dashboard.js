import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
const Dashboard = (props) => {

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    setCodeGenerated(true);
    event.preventDefault();
    console.log(inputs);
  }

  const [codeGenerated, setCodeGenerated] = useState(false);

  if(!codeGenerated){

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
        <hr/>
        <form onSubmit = {handleSubmit}>
          <label>
            Number of Tokens:
            <input type = "number" name = "numberOfTokens" value = {inputs.numberOfTokens} onChange = {handleChange}></input>
          </label>
          <label>
            Expire Date
            <input type = "date" name = "expireDate" value = {inputs.expireDate} onChange = {handleChange}></input>
          </label>
          <hr/>

        <button type = "submit" value = "submit" className="btn code-btn">Generate Code</button>
        </form>
        </div>
    </div>
  );
}
else{
  return(
    <>
    </>
  )
    
  
}
}
export default Dashboard;