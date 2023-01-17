import "./Car.css";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import React from "react";

const Car = (props) => {
  const navigate = useNavigate();

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
        <Button
          className="carBtn"
          variant="secondary"
          onClick={() => navigate(`/carDetails/${props._id}`)}
        >
          Inscrever
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Car;
