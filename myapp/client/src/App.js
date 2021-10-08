import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 
import './App.css';
import home from './Pages/home';
import login from './Pages/login';
import ourTeam from './Pages/ourTeam';
 
function App() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/ourTeam" component = {ourTeam}/>
          <Route exact path="/:login" component = {login}/>
        </Switch>
      </Router>
    </div>
  );
}
export default App;