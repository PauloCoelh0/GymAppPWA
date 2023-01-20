import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../../AdminPage/hooks/useGetData";
import { UsersContext } from "../../../../contexts/UsersProvider";
import { usePostData } from "../../../AdminPage/hooks/usePostData";
import { ReactTabulator } from "react-tabulator";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";

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
  const cookieValue = Cookies.get("userID");
  const valueWithoutJ = cookieValue.substring(3, cookieValue.length - 1);
  const userId = valueWithoutJ;
  // console.log(userId);

  const [data, setData] = useState([]);

  const dataArray = Object.values(data);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/acessos/${userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(data);

  //custom date formatter
  var dateFormatter = function (cell, formatterParams) {
    const sCellValue = cell.getValue();
    if (!sCellValue) return "";
    return moment(sCellValue).format("YYYY-MM-DD HH:mm");
  };

  const columns = [
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
    pagination: dataArray,
    paginationSize: 8,
    movableColumns: true,
    paginationCounter: "rows",
    paginationSizeSelector: [3, 6, 8, 10],
  };

  return (
    <Container>
      <h2 className={styles.title}>Registo De Acessos</h2>
      <div className={styles.customTable}>
        <ReactTabulator
          columns={columns}
          layout={"fitColumns"}
          data={dataArray}
          options={options}
          placeholder={"Sem Dados"}
        />
      </div>
    </Container>
  );
};
