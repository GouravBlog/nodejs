import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  let [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (newPassword !== confirmNewPassword) {
        return setError(true);
      }
      let data = await fetch("http://localhost:7000/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email, newPassword }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      if (data.status) {
        toast.success(data.messgae);
        navigate("/login");
      } else {
        toast.error(data.messgae);
      }
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
              <h1>Forgot Password</h1>
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
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <p className="text-danger">
                {error && "new Paasword and confirmed password are not matched"}
              </p>
              <button type="submit" className="btn btn-primary">
                Forgot Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
