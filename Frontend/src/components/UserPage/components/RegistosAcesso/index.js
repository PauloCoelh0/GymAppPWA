import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../../AdminPage/hooks/useGetData";
import { UsersContext } from "../../../../contexts/UsersProvider";
import { usePostData } from "../../../AdminPage/hooks/usePostData";
import { ReactTabulator } from "react-tabulator";
import Cookies from "js-cookie";
import moment from "moment";
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

export const RegistosAcesso = () => {
  const { register, handleSubmit } = useForm();
  const { setUsers } = useContext(UsersContext);
  const cookieValue = Cookies.get("userID");
  const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
  const userId = { _id: valueWithoutJ };
  console.log(userId);
  const { isError, isLoading, data } = useGetData("acessos", 0, 0);
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

  console.log(data.data);
  if (!data.data.length) {
    console.log("No data available");
  }

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }
  var updateIcon = function (value, data, cell, row, options) {
    return '<span><i class="fa fa-floppy-o"></i></span>';
  };

  //custom date formatter
  var dateFormatter = function (cell, formatterParams) {
    const sCellValue = cell.getValue();
    if (!sCellValue) return "";
    return moment(sCellValue).format("YYYY-MM-DD HH:mm");
  };

  const columns = [
    {
      title: "ID",
      field: "user",
      headerFilter: "input",
    },
    {
      title: "Local",
      field: "local",
      hozAlign: "center",
      headerFilter: "input",
    },
    {
      title: "Entrada",
      formatter: dateFormatter,
      field: "entryHour",
      hozAlign: "center",
      headerFilter: "input",
    },
    {
      title: "Saída",
      field: "exitHour",
      formatter: dateFormatter,
      hozAlign: "center",
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
  );
};
