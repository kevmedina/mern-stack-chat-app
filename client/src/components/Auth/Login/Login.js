import React from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../../context/index";
import "./Login.css";

const Login = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        const {
          loginForm: { username, password },
          isLoggedIn,
          message,
          handleLoginInput,
          handleLoginSubmit,
        } = context;

        return (
          <div>
            {isLoggedIn ? (
              <Redirect to="/join" />
            ) : (
              <div className="login">
                <form onSubmit={handleLoginSubmit}>
                  <h2>Login</h2>
                  <div>
                    {/* <label htmlFor="username">Username:</label> */}
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={handleLoginInput}
                    />
                  </div>

                  <div>
                    {/* <label htmlFor="password">Password:</label> */}
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleLoginInput}
                    />
                  </div>
                  <div>
                    <Link to="/login">Forgot Password?</Link>
                  </div>

                  {message && <div>{message}</div>}
                  <button>Login</button>
                </form>
              </div>
            )}
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Login;
