import React from "react";

function JoiningRoom({ roomPlayers, gameStatus, username, callBots }) {
  return (
    <div className="main-screen">
      <span className="display-flex">
        <h1 className="room-status">
          {gameStatus == "" ? "Joining/Creating Room" : gameStatus}
        </h1>
        <h1 className="spinner">
          <i class="uil uil-spinner"></i>
        </h1>
      </span>
      <ul className="player-list">
        {roomPlayers.map((player) => {
          return <li>{player}</li>;
        })}
      </ul>
      {roomPlayers[0] === username && roomPlayers.length < 4 ? <button id="bring-bots-btn" onClick={callBots}>Bring Bots</button> : <></>}
    </div>
  );
}

export default JoiningRoom;
