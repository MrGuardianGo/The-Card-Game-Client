import React, { useEffect, useState } from "react";

function MainScreen({ joinRoom, setErrorMessage, error }) {
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState(sessionStorage.getItem("roomID") || "");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [])
  
  function submitHandler(e) {
    e.preventDefault();
    if (
      username == "" ||
      username.toLocaleLowerCase() === "you" ||
      roomID === "" ||
      username.length > 10
    ) {
      setErrorMessage("Username is too long...");
      return;
    }
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
            if (e.target.value.length > 10) {
              setErrorMessage("Username is too long...");
            }
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
            username.length > 10
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
