import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      let data = await fetch("http://localhost:1000/api/auth/logout", {
        credentials: "include",
      });
      data = await data.json();
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <nav>
      <h3>Logo</h3>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
