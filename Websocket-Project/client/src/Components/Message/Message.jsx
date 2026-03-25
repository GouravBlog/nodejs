import React from "react";
import "./message.css";

const Message = ({ user, message, classs }) => {
  if (user) {
    return <div className={`chat ${classs}`}>{`${user}: ${message}`}</div>;
  } else {
    return <div className={`chat ${classs}`}>{`You: ${message}`}</div>;
  }
};

export default Message;
