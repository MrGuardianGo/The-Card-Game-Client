import React from "react";

function JoiningRoom({roomPlayers, gameStatus}) {


  return (
    <div className="main-screen">
      <span className="display-flex">
        <h1 className="room-status">{gameStatus == "" ? 'Joining/Creating Room' : gameStatus}</h1>
        <h1 className="spinner">
          <i class="uil uil-spinner"></i>
        </h1>
      </span>
      <ul className="player-list">
      {roomPlayers.map((player) => {
            return <li>{player}</li>
      })}
        </ul>
    </div>
  );
}

export default JoiningRoom;
