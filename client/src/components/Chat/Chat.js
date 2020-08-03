import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
// import { AuthContext } from "../../context/index";
import "./Chat.css";

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = process.env.REACT_APP_SERVER_POINT;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setRoom(room);
    setName(name);
  }, [ENDPOINT, location.search]);

  return (
    <div>
      Hello {name}, you have joined room {room}
    </div>
  );
};

export default withRouter(Chat);

// <AuthContext.Consumer>
//   <div className="outerContainer">
//     {(context) => {
//       const {
//         currentUser: { username },
//       } = context;

//       return (
//       );
//     }}
//   </div>
// </AuthContext.Consumer>
