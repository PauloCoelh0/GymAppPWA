import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { UsersContext } from "../../../../contexts/UsersProvider";
import { usePostData } from "../../hooks/usePostData";
import { ReactTabulator } from "react-tabulator";

// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// import Collapse from "@mui/material/Collapse";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";

//TABULATOR
import "react-tabulator/lib/styles.css";
import "tabulator-tables/dist/css/tabulator.min.css";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

const Users = () => {
  const { register, handleSubmit } = useForm();
  const { setUsers } = useContext(UsersContext);
  const { isError, isLoading, data } = useGetData("users", 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData("users");

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

  // const [users, setUseers] = UseState([]);

  const addUser = (data) => {
    const newData = {
      ...data,
      role: { name: "Normal", scope: "normal" },
    };

    addData(newData);
  };

  useEffect(() => {
    setUsers(data.data);
    // setUseers(data.data);
  }, [data, setUsers]);

  // const useers = data.data;

  console.log(data);

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  const columns = [
    // {
    //   title: "Car ID",
    //   field: "carId",
    //   headerFilter: "input",
    //   formatter: "link",
    //   formatterParams: {
    //     url: (cell) => {
    //       return "http://localhost:3000/caredit/" + cell.getValue();
    //     },
    //   },
    // },

    {
      title: "name",
      field: "name",

      headerFilter: "input",
    },
    {
      title: "email",
      field: "email",

      headerFilter: "input",
    },
    {
      title: "Idade",
      field: "age",

      headerFilter: "input",
    },
    {
      title: "Morada",
      field: "address",

      headerFilter: "input",
    },
    {
      title: "País de Origem",
      field: "country",

      headerFilter: "input",
    },
  ];

  const options = {
    pagination: data.pagination,
    paginationSize: 8,
    movableColumns: true,
    paginationCounter: "rows",
    paginationSizeSelector: [3, 6, 8, 10],
  };

  return (
    <Container>
      {/* <div>
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
              ADD NEW
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form
                method="post"
                className="form-Cars1"
                enctype="multipart/formdata"
                // onSubmit={handleSubmit(onSubmit)}
              >
                <div className="field8">
                  <label className="l8">Type: </label>
                  <select
                    itemType="text"
                    className="s8"
                    name="carType"
                    {...register("carType")}
                  >
                    <option itemType="text" defaultValue="Car">
                      Car
                    </option>
                    <option itemType="text" defaultValue="Comercial">
                      Comercial
                    </option>
                    <option itemType="text" defaultValue="Prestige">
                      Pregiste
                    </option>
                  </select>
                </div>
                <div className="field1">
                  <label>Brand: </label>
                  <input
                    type="text"
                    name="brand"
                    {...register("brand")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Model: </label>
                  <input
                    type="text"
                    name="model"
                    {...register("model")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Seating Capacity: </label>
                  <input
                    type="text"
                    name="seatingCapacity"
                    {...register("seatingCapacity")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Doors: </label>
                  <input
                    type="text"
                    name="numDoors"
                    {...register("numDoors")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Plate: </label>
                  <input
                    type="text"
                    name="plate"
                    {...register("plate")}
                    required
                  />
                </div>
                <div className="field1">
                  <label>Rent Price Per Day: </label>
                  <input
                    type="text"
                    name="rentPricePerDay"
                    {...register("rentPricePerDay")}
                    required
                  />
                </div>
                <div className="field2">
                  <label className="l1">Transmission: </label>
                  <select
                    itemType="text"
                    className="s1"
                    name="transmisson"
                    {...register("transmisson")}
                  >
                    <option itemType="text" value="Manual">
                      Manual
                    </option>
                    <option itemType="text" value="Automatic">
                      Automatic
                    </option>
                  </select>
                </div>
                {/* <div>
                  <input
                    type="file"
                    name="carImage"
                    {...register("carImage")}
                    required
                  />
                </div> 
                <br />
                <input className="submit1" type="submit" value="ADD CAR" />
              </form>
            </Typography>
          </Box>
        </Modal>
      </div> */}
      <div className={styles.customTable}>
        <ReactTabulator
          columns={columns}
          layout={"fitColumns"}
          data={data.data}
          options={options}
          placeholder={"No Data Set"}
        />
      </div>
    </Container>

    // <Container>
    //   <Row>
    //     <Col className={styles.column}>
    //       <h3>Create User</h3>
    //       <div className={styles.container}>
    //         <form className={styles.form} onSubmit={handleSubmit(addUser)}>
    //           <div className={styles.field}>
    //             <label className={styles.label} for="name">
    //               Name:
    //             </label>
    //             <input
    //               id="name"
    //               type="name"
    //               name="name"
    //               required="required"
    //               {...register("name")}
    //             />
    //           </div>
    //           <div className={styles.field}>
    //             <label className={styles.label} for="password">
    //               Password:
    //             </label>
    //             <input
    //               id="password"
    //               type="password"
    //               name="password"
    //               required="required"
    //               {...register("password")}
    //             />
    //           </div>
    //           <div className={styles.field}>
    //             <label className={styles.label} for="email">
    //               Email:
    //             </label>
    //             <input
    //               id="email"
    //               type="email"
    //               name="email"
    //               required="required"
    //               {...register("email")}
    //             />
    //           </div>
    //           <div className={styles.field}>
    //             <label className={styles.label} for="age">
    //               Age :
    //             </label>
    //             <input id="age" name="age" type="number" {...register("age")} />
    //           </div>
    //           <div className={styles.field}>
    //             <label className={styles.label} for="address">
    //               Address :
    //             </label>
    //             <input
    //               id="address"
    //               name="address"
    //               required="required"
    //               {...register("address")}
    //             />
    //           </div>
    //           <div className={styles.field}>
    //             <label className={styles.label} for="country">
    //               Country :
    //             </label>
    //             <input
    //               id="country"
    //               name="country"
    //               required="required"
    //               {...register("country")}
    //             />
    //           </div>
    //           <Row>
    //             <input className="submit" type="submit" />
    //           </Row>
    //         </form>
    //       </div>
    //     </Col>
    //     <Col></Col>
    //   </Row>
    // </Container>
  );
};

export default Users;
