import "./Aula.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

class Aula extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: props.participants,
    };
  }

  handleUpdate = () => {
    const cookieValue = Cookies.get("userID");
    const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
    const data = { _id: valueWithoutJ };
    axios
      .put(`http://localhost:3000/aulas/${this.props._id}`, data)
      .then((res) => {
        if (res.status === 200) {
          this.setState((prevState) => {
            return { participants: prevState.participants + 1 };
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.aulaImage} />
        <Card.Body>
          <Card.Title style={{ fontWeight: "700", marginTop: "40px" }}>
            {this.props.name}
          </Card.Title>
          <Card.Text>
            <p className="aulaDetails">Início: {this.props.beginDate}</p>
            <p className="aulaDetails">Fim: {this.props.endDate}</p>
            <p className="aulaDetails">Capacidade: {this.props.capacity}</p>
            <p className="aulaDetails">
              Inscritos: <b>{this.state.participants}</b>
            </p>
          </Card.Text>
          <Button
            className="aulaBtn"
            variant="secondary"
            onClick={this.handleUpdate}
          >
            Inscrever
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Aula;
