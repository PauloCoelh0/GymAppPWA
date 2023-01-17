import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../../AdminPage/hooks/useGetData";
import { usePostData } from "../../../AdminPage/hooks/usePostData";
import { Card, Button } from "react-bootstrap";
// import { TabContext } from "../../contexts";
import moment from "moment";

import DeleteIcon from "@mui/icons-material/Delete";

//TABULATOR
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "tabulator-tables/dist/css/tabulator.min.css";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

//MODALS
// import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

export const Marcacoes = () => {
  const { register, handleSubmit } = useForm();
  const { isError, isLoading, data } = useGetData("aulas", 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData("aulas/create");
  // const { setGamesCount } = useContext(TabContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   setGamesCount(data.data.length);
  // }, [data, setGamesCount]);

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>No Data Loading</div>;
  }

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
    height: 350,
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
    top: "250px",
    left: "50%",
  };

  const props = data;

  console.log(data.data[1].name);
  console.log("aquiii");

  //custom date formatter
  var dateFormatter = function (cell, formatterParams) {
    var value = cell.getValue();

    if (value) {
      value = moment(value, "YYYY/MM/DD HH:mm").format("lll");
    }

    return value;
  };

  const columns = [
    {
      title: "Uer ID",
      field: "_id",
      headerFilter: "input",
      formatter: "link",
      // formatterParams: {
      //   url: (cell) => {
      //     return "http://localhost:3000/admin/" + cell.getValue();
      //   },
      // },
    },

    {
      title: "name",
      field: "name",
      editor: true,

      headerFilter: "input",
    },
    {
      title: "Capacidade",
      field: "capacity",
      width: 124,
      hozAlign: "center",
      headerFilter: "input",
    },
    {
      title: "Sala",
      field: "room",
      hozAlign: "center",
      width: 72,
      headerFilter: "input",
    },
    {
      title: "Data de Início",
      field: "beginDate",
      formatter: dateFormatter,
      headerFilter: "input",
    },
    {
      title: "Data de Fim",
      field: "endDate",
      formatter: dateFormatter,
      headerFilter: "input",
    },
    {
      title: "Participantes",
      field: "participants",
      headerFilter: "input",
    },
    // {
    //   title: "Example",
    //   field: "example",
    //   formatter: "image",
    //   formatterParams: {
    //     height: "50px",
    //
    //     urlPrefix: "http://website.com/images/",
    //     urlSuffix: ".png",
    //   },
    // },
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
      <div className={styles.customTable}>
        <ReactTabulator
          columns={columns}
          layout={"fitColumns"}
          data={data.data}
          options={options}
          placeholder={"No Data Set"}
        />
      </div>
      <Card style={{ width: "18rem" }}>
        {/* <Card.Img variant="top" src={dat.carImage} /> */}
        <Card.Body>
          <Card.Title style={{ fontWeight: "700", marginTop: "40px" }}>
            {data.data[0].name}
            <span style={{ fontWeight: "lighter", color: "grey" }}>
              ({data.data[0].participants})
            </span>
          </Card.Title>
          <Card.Text>
            <p className="carDetails">Seats: {props.seatingCapacity}</p>
            <p className="carDetails">Doors: {props.numDoors}</p>
            <p className="carDetails">Transmisson: {props.transmisson}</p>
            <p className="carDetails">
              Rent Price Per Day: <b>{} €</b>
            </p>
          </Card.Text>
          <Button
            className="carBtn"
            variant="secondary"
            // onClick={() => navigate(`/carDetails/${props.carId}`)}
          >
            See More
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
