import { useEffect } from "react";
import { user } from "../Join/Join";
import "./chat.css";
import { io } from "socket.io-client";
import { useMemo } from "react";
import Message from "../Message/Message";
import { useState } from "react";

const Chat = () => {
  let socket = useMemo(() => io("http://localhost:2000"), []);

  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [id, setId] = useState("");

  function sendMessage() {
    let message = document.getElementById("text").value;
    socket.emit("send-message", { message, id });
    document.getElementById("text").value = "";
  }

  useEffect(() => {
    socket.on("connect", () => {
      setId(socket.id);
      console.log(`socket is connected`, socket.id);
    });

    socket.emit("join-user", { user });

    socket.on("welcome", ({ message }) => {
      console.log(message);
    });

    socket.on("sendtobordcast", ({ message }) => {
      console.log(message);
    });

    return () => {
      socket.emit("user-disconnect");
      socket.off();
    };
  }, [socket]);

  useEffect(() => {
    socket.on("send-to-message", (data) => {
      //   setMessages([...messages, data]);
      setMessages((prev) => [...prev, data]);
      //   console.log(`user:${data.user} message:${data.message}  id : ${data.id}`);s

      return () => socket.off("send-to-message");
    });
  }, []);

  console.log("messages", messages);
  return (
    <>
      <div className="chatpage">
        <div className="chat-container">
          <div className="header">
            <h2>C Chat</h2>
          </div>
          <div className="chats">
            {messages.map((item) => (
              <Message
                user={item.id === id ? "" : item.user}
                message={item.message}
                classs={item.id === id ? "right" : "left"}
              />
            ))}
          </div>
          <div className="footer">
            <input
              type="text"
              placeholder="Enter Your Chats..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="text"
            />
            <button onClick={sendMessage}>send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
