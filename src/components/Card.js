import React from "react";

function Card({ type, setGiveawayCard }) {
  return (
    <div
      className="card"
      onClick={() => {
        setGiveawayCard(type);
      }}
    >
      <img src={`assets/${type}.png`} width={90} />
    </div>
  );
}

export default Card;
