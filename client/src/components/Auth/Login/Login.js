import React from "react";
import { Redirect, Link } from "react-router-dom";
// import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <form>
        <h2>Login</h2>
        <div>
          {/* <label htmlFor="username">Username:</label> */}
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            // value={username}
            // onChange={handleLoginInput}
          />
        </div>

        <div>
          {/* <label htmlFor="password">Password:</label> */}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            // value={password}
            // onChange={handleLoginInput}
          />
        </div>
        <div>
          <Link to="/login-page">Forgot Password?</Link>
        </div>

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
