import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState([]);

  async function getUserProfile() {
    try {
      let data = await fetch(
        `http://localhost:7000/api/auth/profile/${user._id}`,
      );
      data = await data.json();
      // console.log("data", data.user);
      setUserData(data.user);
    } catch (error) {
      console.log(error);
      toast.error(error.messgae);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  console.log(userData);
  // console.log("user", user);

  return (
    <>
      <div>
        <img
          src={`http://localhost:7000/api/auth/profilePicture/${user._id}`}
          alt=""
        />
        <p>fullname : {userData.fullname}</p>
        <p>email : {userData.email}</p>
      </div>
    </>
  );
};

export default Profile;
