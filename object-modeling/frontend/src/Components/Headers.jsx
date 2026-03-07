import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();

  let [logedIn, setLogedIn] = useState(false);
  let [user, setUser] = useState("");
  let [token, setToken] = useState("");

  async function CheckAuthentication() {
    try {
      let data = await fetch("http://localhost:7000/api/auth/check-auth", {
        credentials: "include",
      });
      data = await data.json();
      setLogedIn(data.userLogedIn);
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLogedIn(false);
    }
  }

  useEffect(() => {
    CheckAuthentication();
  }, []);

  async function handleLogout() {
    try {
      let data = await fetch("http://localhost:7000/api/auth/logout", {
        credentials: "include",
      });
      data = await data.json();
      toast.success(data.messgae);
      setToken("");
      setLogedIn(false);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div
          className="container-fluid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <a className="navbar-brand" href="#">
            <img src={"./logo.webp"} alt="" style={{ width: "100px" }} />
          </a>

          <div>
            {!logedIn ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <div className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to={`/profile/${user._id}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={`http://localhost:7000/api/auth/profilePicture/${user._id}`}
                      alt=""
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Headers;
