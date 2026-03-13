import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Register() {
  const [photo, setFile] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let formdata = new FormData();
      formdata.append("name", name);
      formdata.append("photo", photo);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      let { data } = await axios.post(
        "http://localhost:9000/register",
        formdata,
        config,
      );

      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="row mt-4 ">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
