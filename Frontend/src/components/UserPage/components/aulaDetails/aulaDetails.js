import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Marcacoes/Cars.css";
// import config from "../../config";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import SensorDoorIcon from "@mui/icons-material/SensorDoor";
import NatureIcon from "@mui/icons-material/Nature";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// import CarRent from "./../bookings/add/bookingForm";

export default function Details(props) {
  const { aulaId } = useParams();
  const [details, setCarsDetails] = useState([]);
  const navigate = useNavigate();
  const url = `http://localhost:3000/aulas/${props.aulaId}`;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("estou aqui");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 390,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const addrent = {
    width: 830,
    height: 60,
    bgcolor: "#FFF",
    color: "black",
    bgcolor: "#FFF",
    "&:hover": {
      background: "#FECC01",
      color: "white",
    },
    fontWeight: "600",
    size: "300px",
    border: "2px solid #000",
    transform: "translate(-50%, -50%)",
    boxShadow: 14,
    position: "absolute",
    top: "93%",
    left: "50%",
  };

  useEffect(() => {
    const getCarsDetails = async () => {
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          //   Authorization: `Baerer ${config.token}`,
        },
      });
      console.log(response.data);
      setCarsDetails(response.data);
    };
    getCarsDetails();
  }, []);

  const imgUrl = `http://localhost:3000/${details.aulaImage}`;
  console.log(imgUrl);

  return (
    <div className="cardetails2">
      <Card style={{ height: "820px", width: "900px" }}>
        <Card.Img
          style={{ height: "500px", width: "898px" }}
          variant="top"
          src={imgUrl}
        />
        <Card.Body style={{ width: "900px" }}>
          <Card.Title style={{ fontWeight: "700", fontSize: "40px" }}>
            {details.name}
          </Card.Title>
          <Card.Text style={{ paddingBottom: "10px" }}>
            <p className="carDetails">
              <DirectionsCarIcon /> &nbsp;{details.carType}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <PeopleIcon /> &nbsp;{details.seatingCapacity}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <SensorDoorIcon /> &nbsp;
              {details.numDoors}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <NatureIcon /> &nbsp;{details.transmisson}
              <span className="price">{details.rentPricePerDay} €</span> / day
            </p>
          </Card.Text>
          <div>
            <Button sx={addrent} onClick={handleOpen}>
              RENT CAR
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  CHOOSE A DATE
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {/* <CarRent carId={carId} /> */}
                </Typography>
              </Box>
            </Modal>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
