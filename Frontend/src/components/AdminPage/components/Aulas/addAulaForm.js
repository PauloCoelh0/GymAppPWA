import { useForm } from "react-hook-form";
import "./CarsForm.css";
// import config from "../../../config";
import axios from "axios";
import { useState } from "react";
import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const url = "http://localhost:3000/aulas/create";

// function refreshPage() {
//   window.location.reload();
// }

const AulasForm = () => {
  const [carCreatedSuccess, setCarCreatedSuccess] = useState(null);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => postCar(data);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: 510,
  };

  const addcar = {
    width: 300,
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
    top: "25%",
    left: "50%",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const postCar = async (data) => {
    const carData = new FormData();
    carData.append("name", data.name);
    carData.append("beginDate", data.beginDate);
    carData.append("endDate", data.endDate);
    carData.append("capacity", data.capacity);
    carData.append("room", data.room);
    carData.append("aulaImage", data.aulaImage[0]);

    try {
      const response = await axios.post(url, carData, {
        headers: {},
      });
      console.log(response);
      if (response.status === 200) {
        setCarCreatedSuccess(true);
        return response.data.data;
      } else {
        alert("Car duplicate");
      }
    } catch (e) {
      setCarCreatedSuccess(false);
      console.log(e);
    }
  };

  const [opeen, setOpeen] = useState(true);
  if (carCreatedSuccess) {
    return (
      <div className="wrapper">
        <Collapse in={opeen}>
          <Alert
            id="slide"
            variant="filled"
            severity="success"
            color="warning"
            onClose={() => {
              setOpeen(false);
              setTimeout(function () {
                window.location.reload(1);
              }, 50);
            }}
          >
            <AlertTitle>Successfully Created</AlertTitle>
          </Alert>
        </Collapse>
      </div>
    );
  }
  if (carCreatedSuccess === false) {
    return (
      <div className="wrapper">
        <Collapse in={opeen}>
          <Alert
            id="slide"
            variant="filled"
            severity="error"
            onClose={() => {
              setOpeen(false);
              setTimeout(function () {
                window.location.reload(1);
              }, 50);
            }}
          >
            <AlertTitle>
              <b>ERROR:</b> DUPLICATE PLATE
            </AlertTitle>
          </Alert>
        </Collapse>
      </div>
    );
  }
  return (
    <>
      <div>
        <Button sx={addcar} onClick={handleOpen}>
          ADD CAR
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ADD NEW CAR
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form
                method="post"
                className="form-Cars1"
                enctype="multipart/formdata"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="field1">
                  <label>Nome: </label>
                  <input
                    type="text"
                    name="name"
                    {...register("name")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Data Inicio: </label>
                  <input
                    type="datetime-local"
                    name="beginDate"
                    {...register("beginDate")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Data Fim: </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    {...register("endDate")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Capacidade: </label>
                  <input
                    type="text"
                    name="capacity"
                    {...register("capacity")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Sala: </label>
                  <input
                    type="text"
                    name="room"
                    {...register("room")}
                    required
                  />
                </div>
                <div>
                  <input
                    type="file"
                    name="aulaImage"
                    {...register("aulaImage")}
                    required
                  />
                </div>
                <br />
                <input className="submit1" type="submit" value="ADD CAR" />
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default AulasForm;
