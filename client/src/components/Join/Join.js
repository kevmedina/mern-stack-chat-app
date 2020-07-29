import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/index";
import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <AuthContext.Consumer>
      {(context) => {
        const {
          currentUser: { username },
        } = context;
        return (
          <div className="joinOuterContainer">
            <div className="joinInnerContainer">
              <h1 className="heading">JOIN ROOM</h1>
              <div>
                {/* <input
                  placeholder="Name"
                  className="joinInput"
                  type="text"
                  onChange={(event) => setName(event.target.value)}
                /> */}
                <p className="name"> Welcome {username}</p>
              </div>
              <div>
                <input
                  placeholder="Enter the name of the room"
                  className="joinInput mt-20"
                  type="text"
                  onChange={(event) => setRoom(event.target.value)}
                />
              </div>
              <Link
                onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                to={`/chat?name=${name}&room=${room}`}
              >
                <button className={"button mt-20"} type="submit">
                  Join Room
                </button>
              </Link>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Join;
