import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import Signup from "./components/Auth/Signup/Signup";

const App = () => {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
