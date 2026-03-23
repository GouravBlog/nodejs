import { useMemo, useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  let socket = useMemo(
    () =>
      io("http://localhost:1000", {
        withCredentials: true,
      }),
    [],
  );

  const [message, setMessage] = useState("");
  const [socketID, setSocketID] = useState();
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("welcome", (data) => {
      setSocketID(socket.id);
    });

    socket.on("received-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      socket.emit("message", { room, message });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleGroup(e) {
    e.preventDefault();
    try {
      socket.emit("join-room", roomName);
      setRoomName("");
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("message", message);
  return (
    <>
      <h1>App Component</h1>

      {<h3>{socketID}</h3>}

      <form onSubmit={handleGroup}>
        <div>
          <label htmlFor="">Group Name:</label>
          <input
            type="text"
            placeholder="Enter Group Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button type="submit">Send</button>
        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter sender ID"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>

      {
        <div>
          {messages.map((m) => (
            <div>{m}</div>
          ))}
        </div>
      }
    </>
  );
}

export default App;
