import { useMemo, useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  let socket = useMemo(() => io("http://localhost:1000"), []);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // socket.on("welcome", (data) => {
    //   console.log(data);
    // });

    socket.on("received-message", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      socket.emit("message", message);
      // setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("message", message);
  return (
    <>
      <h1>App Component</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
