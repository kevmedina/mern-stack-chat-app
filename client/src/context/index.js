import React, { useState, useEffect } from "react";
import AUTH_SERVICE from "../services/AuthService";
import { withRouter } from "react-router-dom";
export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  // State for the user
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user once component mounts
  useEffect(() => {
    AUTH_SERVICE.getUser()
      .then((userFromDB) => {
        const { user } = userFromDB.data;
        setCurrentUser(user);
        setIsLoggedIn(user ? true : false);
        setLoading(false);
      })
      .catch((err) =>
        console.log(`Error occured while getting the user: ${err}`)
      );
  }, []);

  const handleSignupInput = (e) => {
    const { name, value } = e.target;
    setSignupForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    AUTH_SERVICE.signup(signupForm)
      .then((responseFromServer) => {
        const { user, message } = responseFromServer.data;
        setSignupForm((prevState) => ({
          ...prevState,
          username: "",
          email: "",
          password: "",
        }));
        setCurrentUser(user);
        setIsLoggedIn(true);
        console.log(`${message}`);
        props.history.push("/join");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setMessage(err.response.data.message);
        }
      });
  };

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    AUTH_SERVICE.login(loginForm)
      .then((userFromDB) => {
        const { user, message } = userFromDB.data;
        setLoginForm((prevState) => ({
          ...prevState,
          username: "",
          password: "",
        }));
        setCurrentUser(user);
        setIsLoggedIn(true);
        console.log(`${message}`);
        props.history.push("/join");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setMessage(err.response.data.message);
        }
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    AUTH_SERVICE.logout()
      .then(() => {
        setCurrentUser({});
        setIsLoggedIn(false);
        props.history.push("/");
      })
      .catch((err) => console.log(`Error occured while logging out: ${err}`));
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          loginForm,
          signupForm,
          currentUser,
          message,
          loading,
          isLoggedIn,
          handleLoginInput,
          handleLoginSubmit,
          handleSignupInput,
          handleSignupSubmit,
          handleLogout,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    </div>
  );
};

export default withRouter(AuthProvider);
