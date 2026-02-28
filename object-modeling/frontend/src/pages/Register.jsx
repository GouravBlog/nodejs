import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mob, setMob] = useState("");
  const [photo, setPhoto] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("mob", mob);
      formData.append("photo", photo);

      let response = await fetch("http://localhost:7000/api/auth/register", {
        method: "POST",
        body: formData, // ✅ important
      });

      let data = await response.json();
      console.log(data);

      if (data.status) {
        toast.success(data.messgae);
        navigate("/login");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>User Register</h2>
        <div className="form-control">
          <label htmlFor="">Fullname :</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Email :</label>
          <input
            type="email"
            placeholder="Enter your full name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Password :</label>
          <input
            type="password"
            placeholder="****************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Mobile :</label>
          <input
            type="text"
            placeholder="Enter your Number"
            value={mob}
            onChange={(e) => setMob(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Mobile :</label>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
        <button type="submit">Signup</button>
      </form>
    </>
  );
};

export default Register;
