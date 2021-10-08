import React from "react";
import Sawo from "sawo";
import Dashboard from "./Dashboard";

function LoginComponent() {
  let [payload, setPayload] = React.useState(false);

  React.useEffect(() => {
    let config = {
      containerID: "sawo-container",
      identifierType: "email",
      apiKey: "40066b66-4dd4-44ae-9645-4da731da3837",
      onSuccess: (payload) => {
        console.log(payload);
        setPayload(payload);
      },
    };
    let sawo = new Sawo(config);
    sawo.showForm();
  }, []);

  return (<>
         <div
          class = "login-container"
          id="sawo-container"
          style={{ height: "300px", width: "300px" }}
        ></div>
        {payload && (
        <>
          <Dashboard payload={payload} />
        </>
        )}
</>
  );
}
export default LoginComponent;

// import React, { Component } from "react";

// const LoginComponent = () => {
//     return (
//         <div>
//             <h2>Login Form</h2>
//         </div>
//     )
// }

// export default LoginComponent;

// import React, { useEffect } from 'react'
// import Sawo from 'sawo'

// const LoginComponent = () => {
//     useEffect(() => {
//         var config = {
//             // should be same as the id of the container created on 3rd step
//             containerID: 'sawo-container',
//             // can be one of 'email' or 'phone_number_sms'
//             identifierType: 'email',
//             // Add the API key copied from 5th step
//             apiKey: "40066b66-4dd4-44ae-9645-4da731da3837",
//             // Add a callback here to handle the payload sent by sdk
//             onSuccess: payload => {
//                 // you can use this payload for your purpose
//             },
//         }
//         let sawo = new Sawo(config)
//         sawo.showForm()
//     }, [])

//     return (
//         <div>
//             <div id="sawo-container" style={{height:"300px", width:"400px"}}></div>
//         </div>
//     )
// }

// export default LoginComponent;