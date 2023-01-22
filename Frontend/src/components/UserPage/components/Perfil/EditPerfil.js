import { useForm } from "react-hook-form";
// import config from "../../config";
import { useState, useEffect } from "react";
import * as React from "react";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import Cookies from "js-cookie";
import { useGetPerfil } from "../../../../hooks/useGetPerfil";
import "./updateForm.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const UserUpdateForm = () => {
  const cookieValue = Cookies.get("userID");
  const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
  const userId = valueWithoutJ;
  const url = `http://localhost:3000/users/${userId}`;
  console.log("URL", url);

  const { register, handleSubmit, watch, errors } = useForm();
  const [changeUpdateSuccess, setChangeUpdateSuccess] = useState(false);
  const onSubmit = (data) => changeState(data);
  const { isError, isLoading, user } = useGetPerfil("users");

  console.log(user.data);

  const users = user.data;

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
  };

  const addcar = {
    width: 300,
    bgcolor: "#FFF",
    "&:hover": {
      background: "rgb(131, 6, 6)",
      color: "white",
    },
    fontWeight: "600",
    color: "black",
    size: "300px",
    border: "2px solid #000",
    transform: "translate(-50%, -50%)",
    boxShadow: 14,
    position: "absolute",
    top: "79%",
    left: "50%",
  };

  const [opeen, setOpeen] = React.useState(false);
  const handleOpen = () => setOpeen(true);
  const handleClose = () => setOpeen(false);

  const changeState = (data) => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response) {
          setChangeUpdateSuccess(true);
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [open, setOpen] = useState(true);

  if (changeUpdateSuccess) {
    return (
      <div>
        <div className="wrapper2">
          <Collapse in={open}>
            <Alert
              id="slide"
              color="info"
              variant="filled"
              severity="success"
              onClose={() => {
                setOpen(false);
                setTimeout(function () {
                  window.location.reload(1);
                }, 50);
              }}
            >
              <AlertTitle>Successfully Updated</AlertTitle>
            </Alert>
          </Collapse>
        </div>
      </div>
    );
  }

  console.log(`Esta a funcionar isto ${users.name}`);
  return (
    <div className="form-Bookings">
      <div>
        <Button sx={addcar} onClick={handleOpen}>
          Editar Perfil
        </Button>
        <Modal
          open={opeen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Perfil
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form className="form-Cars1" onSubmit={handleSubmit(onSubmit)}>
                <div className="field1">
                  <label>Nome: </label>
                  <input
                    name="name"
                    key={users.name}
                    defaultValue={users.name}
                    {...register("name")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Email: </label>
                  <input
                    name="email"
                    type="email"
                    key={users.email}
                    defaultValue={users.email}
                    {...register("email")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Password: </label>
                  <input
                    type="password"
                    name="password"
                    key={users.password}
                    defaultValue={users.password}
                    {...register("password")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Idade: </label>
                  <input
                    name="age"
                    key={users.age}
                    defaultValue={users.age}
                    {...register("age")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Morada: </label>
                  <input
                    name="address"
                    key={users.address}
                    defaultValue={users.address}
                    {...register("address")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>País de Origem: </label>
                  <input
                    key={users.country}
                    defaultValue={users.country}
                    {...register("country")}
                    required
                  />
                </div>
                <input className="updateBtn" type="submit" value="Confirm" />
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserUpdateForm;

//   const [cars, setCars] = useState({});

//   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//   console.log(cars);

//   useEffect(() => {
//     const getCars = () => {
//       axios
//         .get(url)
//         .then((response) => {
//           console.log("response", response);
//           setCars(response.data);
//         })
//         .catch((error) => {
//           console.log("error", error);
//           console.log(error);
//         });
//     };
//     getCars();
//   }, []);
