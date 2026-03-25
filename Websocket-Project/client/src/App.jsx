// import { useEffect } from "react";
// import { io } from "socket.io-client";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat";

function App() {
  // const socket = io("http://localhost:2000");

  // useEffect(() => {}, [socket]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
