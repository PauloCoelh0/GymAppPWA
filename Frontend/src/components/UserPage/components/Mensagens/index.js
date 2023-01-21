import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import styles from "./styles.module.scss";
import { ReactTabulator } from "react-tabulator";
import moment from "moment";
import axios from "axios";
import { MensagensContext } from "../../../../contexts";

//TABULATOR
import "react-tabulator/lib/styles.css";
import "tabulator-tables/dist/css/tabulator.min.css";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

export const Mensagens = () => {
  const [data, setData] = useState([]);
  const { setMensagensCount } = useContext(MensagensContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/mensagens`)
      .then((response) => {
        setData(response.data);
        setMensagensCount(response.data.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Custom DataFormatter
  var dateFormatter = function (cell, formatterParams) {
    const sCellValue = cell.getValue();
    if (!sCellValue) return "";
    return moment(sCellValue).format("YYYY-MM-DD HH:mm");
  };

  const columns = [
    {
      title: "From",
      field: "from",
      hozAlign: "center",
      headerFilter: "input",
    },
    {
      title: "Título",
      field: "subject",
      hozAlign: "center",
      headerFilter: "input",
    },
    {
      title: "Data",
      formatter: dateFormatter,
      field: "date",
      hozAlign: "center",
      headerFilter: "input",
    },
    {
      title: "Mensagem",
      field: "text",
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
      <h2 className={styles.title}>Registo De Mensagens</h2>
      <div className={styles.customTable}>
        <ReactTabulator
          columns={columns}
          layout={"fitColumns"}
          data={data.data}
          options={options}
          placeholder={"Sem Dados"}
        />
      </div>
    </Container>
  );
};
