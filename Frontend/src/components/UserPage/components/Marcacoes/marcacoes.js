import "./Aula.css";
import { Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { format } from "date-fns";

function Aula(props) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [participants, setParticipants] = useState(props.participants);

  useEffect(() => {
    const userId = Cookies.get("userID");
    axios
      .get(`http://localhost:3000/aulas/subscription/${props._id}/${userId}`)
      .then((res) => {
        setIsSubscribed(res.data.isSubscribed);
        setParticipants(res.data.participants);
      })
      .catch((err) => console.log(err));
  }, []); // pass an empty array as the second argument to only run the effect on mount

  const handleUpdate = () => {
    const cookieValue = Cookies.get("userID");
    const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
    const data = { _id: valueWithoutJ };
    if (!isSubscribed) {
      axios
        .put(`http://localhost:3000/aulas/${props._id}`, data)
        .then((res) => {
          if (res.status === 200) {
            setParticipants(participants + 1);
            setIsSubscribed(true);
            Cookies.set("isSubscribed", true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`http://localhost:3000/aulas/remove/${props._id}`, data)
        .then((res) => {
          if (res.status === 200) {
            setParticipants(participants - 1);
            setIsSubscribed(false);
            Cookies.set("isSubscribed", false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.aulaImage} />
      <Card.Body>
        <Card.Title style={{ fontWeight: "700", marginTop: "40px" }}>
          {props.name}
        </Card.Title>
        <Card.Text>
          <p className="aulaDetails">
            Início: {format(new Date(props.beginDate), "dd/MM/yyyy HH:mm")}
          </p>
          <p className="aulaDetails">
            Fim: {format(new Date(props.endDate), "dd/MM/yyyy HH:mm")}
          </p>
          <p className="aulaDetails">Capacidade: {props.capacity}</p>
          <p className="aulaDetails">
            Inscritos: <b>{participants}</b>
          </p>
        </Card.Text>
        <Button
          className={`aulaBtn ${isSubscribed ? "red-button" : ""}`}
          variant="secondary"
          onClick={handleUpdate}
        >
          {isSubscribed ? "Desinscrever" : "Inscrever"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Aula;
