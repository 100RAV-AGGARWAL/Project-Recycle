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
        <div className = "login-container" style={{ 
      backgroundImage: `../../public/assets/img/arnaud-mesureur-7EqQ1s3wIAI-unsplash.jpg` 
    }}>
        <div
          id="sawo-container"
          style={{ height: "300px", width: "300px" }}
        ></div>
        </div>
         
        {payload && (
        <>
          <Dashboard payload={payload} />
        </>
        )}
</>
  );
}
export default LoginComponent;