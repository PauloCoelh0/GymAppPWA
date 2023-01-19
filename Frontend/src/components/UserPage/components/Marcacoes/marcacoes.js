import "./Car.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Car = (props) => {
  console.log(props.aulaImage);
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);

  const handleUpdate = () => {
    const cookieValue = Cookies.get("userID");
    const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
    const data = { _id: valueWithoutJ };
    axios
      .put(`http://localhost:3000/aulas/${props._id}`, data)
      .then((res) => {
        if (res.status === 200) {
          console.log("Successful Update");
          setTimeout(function () {
            window.location.reload(1);
          }, 500);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          console.log("User Inscrito QUASE DE CERTEZA.. QUASEEEEEEE");
        }
      });
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.aulaImage} />
      <Card.Body>
        <Card.Title style={{ fontWeight: "700", marginTop: "40px" }}>
          {props.name}
        </Card.Title>
        <Card.Text>
          <p className="carDetails">Início: {props.beginDate}</p>
          <p className="carDetails">Fim: {props.endDate}</p>
          <p className="carDetails">Capacidade: {props.capacity}</p>
          <p className="carDetails">
            Incristos: <b>{props.participants}</b>
          </p>
        </Card.Text>
        <Button className="carBtn" variant="secondary" onClick={handleUpdate}>
          Inscrever
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Car;
