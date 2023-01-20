import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import styles from "./styles.module.scss";
import { ReactTabulator } from "react-tabulator";
import moment from "moment";
import axios from "axios";
import { AcessosContext } from "../../contexts";

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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setAcessosCount } = useContext(AcessosContext);

  const Loading = () => {
    return <div className="loading-spinner"></div>;
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/acessos`)
      .then((response) => {
        setData(response.data);
        setAcessosCount(data.data.length);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  //custom date formatter
  var dateFormatter = function (cell, formatterParams) {
    const sCellValue = cell.getValue();
    if (!sCellValue) return "";
    return moment(sCellValue).format("YYYY-MM-DD HH:mm");
  };

  const columns = [
    {
      title: "User ID",
      field: "user",
      hozAlign: "center",
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
    pagination: data.data,
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
          data={data.data}
          options={options}
          placeholder={"Sem Dados"}
        />
      </div>
    </Container>
  );
};
