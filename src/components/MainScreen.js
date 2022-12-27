import React, { useState } from "react";

function MainScreen({ joinRoom, setErrorMessage, error }) {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [roomID, setRoomID] = useState(sessionStorage.getItem("roomID") || "");

  function submitHandler(e) {
    e.preventDefault();
    localStorage.setItem("username", username);
    sessionStorage.setItem("roomID", roomID);
    joinRoom(username, roomID);
  }

  return (
    <div className="main-screen">
      <img
        className="main-screen-img"
        src="assets/main.png"
        alt="Main screen logo"
        width={350}
      />
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage(null);
          }}
          value={username}
        />
        <p className="error-message">{error}</p>
        <input
          type="text"
          placeholder="Room ID"
          onChange={(e) => {
            setRoomID(e.target.value);
          }}
          value={roomID}
        />
        <button
          className={
            username == "" ||
            username.toLocaleLowerCase() === "you" ||
            roomID === "" ||
            username.length >= 10
              ? "disabled"
              : ""
          }
        >
          Join/Create Room
        </button>
      </form>
    </div>
  );
}

export default MainScreen;
