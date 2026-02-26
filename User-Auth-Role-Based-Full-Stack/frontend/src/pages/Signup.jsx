import { useState } from "react";
import "./Signup.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [mob, setMob] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let data = await fetch("http://localhost:1000/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, email, password, address, mob }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      console.log(data);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3> User Signup </h3>
          <div className="form-control">
            <label htmlFor="">UserName:</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="">Email:</label>
            <input
              type="email"
              placeholder="Enter Your Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="">Password:</label>
            <input
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="">address:</label>
            <input
              type="text"
              placeholder="Enter Your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="">Mobile:</label>
            <input
              type="text"
              placeholder="Enter Your Mob. No"
              value={mob}
              onChange={(e) => setMob(e.target.value)}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
