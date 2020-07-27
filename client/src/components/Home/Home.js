import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="inner-container">
        <div>
          <h1>Real Time Chat App</h1>
          <p>
            Create an account to chat with your friends at real-time. You can
            create seperate rooms to chat as a group with no limit on the amount
            of users.
          </p>
        </div>
        <div className="links">
          <Link to="login" className="link">
            Already A User?
          </Link>
          <Link to="/signup" className="link">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
