import React, { useEffect, useState } from "react";
import Card from "./Card";

function GameScreen({
  players,
  cards,
  username,
  turn,
  giveaway,
  activateWinBtn,
  winRound,
  winners,
  returnToMainScreen,
  closeInfoModal,
}) {
  const [counter, setCounter] = useState(10);
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (username === turn && !activateWinBtn && winners.length === 0) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setCounter(10);
    }
    if (counter == 0) {
      let array = cards.filter((set) => {
        return set.player === username;
      })[0].cards;
      setCard(array[Math.floor(Math.random() * array.length)]);
    }
  }, [counter, turn]);

  useEffect(() => {
    if (card) {
      giveaway(card);
      setCounter(10);
    }
  }, [card]);

  useEffect(() => {
    if (winners.length === 4 || activateWinBtn || winners.length > 0) {
      closeInfoModal();
    }
  }, [winners]);

  function setGiveawayCard(selectedCard) {
    setCard(selectedCard);
  }

  return (
    <div className="game-screen">
      {activateWinBtn && winners.length > 0 ? (
        <div className="backdrop" />
      ) : (
        <></>
      )}
      {winners.length === 4 && (
        <>
          <div className="backdrop"></div>
          <div className="final-statistics">
            <h1>Final Statistics</h1>
            <div className="player-details">
              <span className="display-flex">
                <h3 className="rank">1</h3>
                <span
                  className="display-flex name-score"
                  style={{ color: "#FFD700" }}
                >
                  <h3 className="name">{winners[0]}</h3>
                  <h3 className="score">30</h3>
                </span>
              </span>
            </div>
            <div className="player-details">
              <span className="display-flex">
                <h3 className="rank">2</h3>
                <span
                  className="display-flex name-score"
                  style={{ color: "#C0C0C0" }}
                >
                  <h3 className="name">{winners[1]}</h3>
                  <h3 className="score">20</h3>
                </span>
              </span>
            </div>
            <div className="player-details">
              <span className="display-flex">
                <h3 className="rank">3</h3>
                <span
                  className="display-flex name-score"
                  style={{ color: "#CD7F32" }}
                >
                  <h3 className="name">{winners[2]}</h3>
                  <h3 className="score">10</h3>
                </span>
              </span>
            </div>
            <div className="player-details">
              <span className="display-flex">
                <h3 className="rank">🤡</h3>
                <span className="display-flex name-score">
                  <h3 className="name">{winners[3]}</h3>
                  <h3 className="score" style={{ fontWeight: 200 }}>
                    0
                  </h3>
                </span>
              </span>
            </div>
            <button className="return-btn" onClick={returnToMainScreen}>
              Return to main screen
            </button>
          </div>
        </>
      )}
      <h1 style={{ textTransform: "uppercase", fontSize: "15px" }}>
        {turn}'s Turn <i class="uil uil-signal-alt-3"></i>
      </h1>
      <h1 style={{ textTransform: "uppercase" }}>{counter}</h1>
      <div
        className={activateWinBtn ? "win-button" : "win-button disabled"}
        onClick={winRound}
      >
        {winners.length === 0 ? (
          <span>
            PRESS
            <br />
            ME
          </span>
        ) : (
          <span>{winners.length}</span>
        )}
      </div>
      <div className="table">
        <div className={`opponent no-1`}>
          <div className="cards">
            {cards
              .find((deck) => {
                return deck.player === players[2];
              })
              .cards.map(() => {
                return <Card key={Math.random()} type={"back"} />;
              })}
          </div>
          <h2>{players[2]}</h2>
        </div>
        <span
          className="display-flex"
          style={{ justifyContent: "space-between" }}
        >
          <div className="opponent no-2">
            <div className="cards">
              {cards
                .find((deck) => {
                  return deck.player === players[3];
                })
                .cards.map(() => {
                  return <Card key={Math.random()} type={"back"} />;
                })}
            </div>
            <h2>{players[3]}</h2>
          </div>
          <div className="opponent no-3">
            <h2>{players[1]}</h2>
            <div className="cards">
              {cards
                .find((deck) => {
                  return deck.player === players[1];
                })
                .cards.map(() => {
                  return <Card key={Math.random()} type={"back"} />;
                })}
            </div>
          </div>
        </span>
        <div className="you">
          <h2>{players[0] + " (You)"}</h2>
          <div className="cards">
            {cards
              .filter((set) => {
                return set.player === username;
              })[0]
              .cards.map((card) => {
                return (
                  <Card
                    key={Math.random()}
                    type={card}
                    setGiveawayCard={setGiveawayCard}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
