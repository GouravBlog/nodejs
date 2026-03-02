import { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let data = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      console.log("data", data);
      toast.success(data.messgae);
      navigate("/");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center w-100 mt-5">
            <form onSubmit={handleSubmit}>
              <h1>User Login</h1>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>{" "}
              <br />
              <span>
                Not Registered <Link to="/signup">Registration</Link>
              </span>{" "}
              <br />
              <NavLink to="/forgot-password">Forgot Password</NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
