import GameScreen from "./components/GameScreen";
import JoiningRoom from "./components/JoiningRoom";
import MainScreen from "./components/MainScreen";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("https://the-card-game-server.onrender.com");

function App() {
  const [myUsername, setMyUsername] = useState("");
  const [turn, setTurn] = useState("");
  const [activateWinBtn, setActivateWinBtn] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [roomPlayers, setRoomPlayers] = useState([]);
  const [gamePlayers, setGamePlayers] = useState([]);
  const [joiningRoom, setJoiningRoom] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStatus, setGameStatus] = useState("");
  const [cards, setCards] = useState([]);
  const [winners, setWinners] = useState([]);
  const [error, setError] = useState(null);

  function joinRoom(username, roomID) {
    setMyUsername(username);
    setRoomID(roomID);
    socket.emit("join-room", { username, roomID });
    if (!error) {
      setJoiningRoom(true);
    }
  }

  function returnToMainScreen() {
    setJoiningRoom(false);
    setGameStarted(false);
    setRoomPlayers([]);
    setGamePlayers([]);
    setCards([]);
    setGameStatus("");
    setActivateWinBtn(false);
    setTurn("");
    setWinners([])
  }

  function giveaway(card) {
    if (turn === myUsername) {
      socket.emit("giveaway", { card, giver: myUsername, roomID });
    }
  }

  function winRound() {
    socket.emit("win-button-pressed", {
      roomID,
      cards: cards.filter((set) => {
        return set.player === myUsername;
      })[0].cards,
      username: myUsername,
    });
    if (winners.indexOf(myUsername) === -1) {
      setWinners([...winners, myUsername]);
    }
  }

  function setErrorMessage(message) {
    setError(message);
  }

  useEffect(() => {
    socket.on("exception", (data) => {
      setError(data.errorMessage);
      setJoiningRoom(false)
    });
    socket.on("room-players", (data) => {
      setRoomPlayers(data);
    });
    socket.on("game-status", (data) => {
      setGameStatus(data);
    });
    socket.on("start-game", (data) => {
      setJoiningRoom(false);
      setGameStarted(true);
      setCards(data.finalDeck);
      setTurn(data.turn);
      const players = data.players;
      const yourIndex = players.indexOf(
        myUsername || localStorage.getItem("username")
      );
      let newArr = [];

      for (let i = 0; i < players.length; i++) {
        if (i === yourIndex) {
          newArr.push(players[i]);
        } else if (i > yourIndex) {
          newArr.push(players[i]);
        }
      }

      players.map((value) => {
        if (!newArr.includes(value)) {
          newArr.push(value);
        }
      });
      setGamePlayers(newArr);
    });
    socket.on("game-manager", (data) => {
      setCards(data.finalDeck);
      setTurn(data.turn);
    });
    socket.on("activate-win-btn", (data) => {
      setActivateWinBtn(data);
    });
    socket.on("winners", (data) => {
      setWinners(data.winners);
      setActivateWinBtn(true);
    });
  }, [socket]);

  function Renderer() {
    if (!gameStarted && !joiningRoom) {
      return (
        <MainScreen
          joinRoom={joinRoom}
          setErrorMessage={setErrorMessage}
          error={error}
        />
      );
    } else if (joiningRoom && !gameStarted) {
      return <JoiningRoom roomPlayers={roomPlayers} gameStatus={gameStatus} />;
    } else if (!joiningRoom && gameStarted) {
      return (
        <GameScreen
          players={gamePlayers}
          cards={cards}
          username={myUsername}
          roomID={roomID}
          turn={turn}
          giveaway={giveaway}
          activateWinBtn={activateWinBtn}
          winRound={winRound}
          winners={winners}
          returnToMainScreen={returnToMainScreen}
        />
      );
    }
  }

  return <div className="main-window">{<Renderer />}</div>;
}

export default App;
