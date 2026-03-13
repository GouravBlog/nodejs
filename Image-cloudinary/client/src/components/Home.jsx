import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";

const Home = () => {
  const [user, setUser] = useState([]);

  async function fetchUser() {
    try {
      let { data } = await axios.get("http://localhost:9000");
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {user &&
        user.map((us) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={us.imagePath} />
              <Card.Body>
                <Card.Title>{us.name}</Card.Title>
                <Card.Text>{moment(us.date).format("MM/DD/YYYY")}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
    </>
  );
};

export default Home;
