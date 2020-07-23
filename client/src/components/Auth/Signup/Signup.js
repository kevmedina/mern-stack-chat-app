import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/index";
import "./Signup.css";

const Signup = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        const {
          signupForm: { username, email, password },
          // message,
          // isLoggedIn,
          handleSignupInput,
          handleSignupSubmit,
        } = context;

        return (
          <div className="signup">
            <form onSubmit={handleSignupSubmit}>
              <h1>Sign Up Now!</h1>
              <div className="inner-form-container">
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleSignupInput}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleSignupInput}
                  />
                </div>

                <div>
                  <label htmlFor="password">Password:</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleSignupInput}
                  />
                </div>
              </div>
              <div>
                <Link to="/login">Already Registered?</Link>
              </div>
              <button>Create Account</button>
            </form>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Signup;
