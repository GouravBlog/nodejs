import { useState } from "react";
import "./Signup.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let data = await fetch("http://localhost:1000/api/auth/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      console.log(data);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3> User Login </h3>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
