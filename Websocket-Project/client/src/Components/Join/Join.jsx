import "./join.css";
import { Link } from "react-router-dom";
let user;

const Join = () => {
  function sendUser() {
    user = document.getElementById("username").value;
    document.getElementById("username").value = "";
  }
  return (
    <>
      <div className="join-page">
        <div className="join-container">
          <h1>C Chat</h1>
          <input type="text" placeholder="Enter Your Name" id="username" />
          <Link to="/chat" onClick={(e) => (!user ? e.preventDefault() : null)}>
            <button onClick={sendUser}> Join</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Join;
export { user };
