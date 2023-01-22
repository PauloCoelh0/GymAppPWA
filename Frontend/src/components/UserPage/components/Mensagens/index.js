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

  var delIcon = function (value, data, cell, row, options) {
    //plain text value
    return '<span><i class="fa fa-trash"></i></span>';
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
    {
      title: "ELIMINAR",
      width: 100,
      formatter: delIcon,
      hozAlign: "center",
      align: "right",
      headerSort: false,
      cellClick: function (e, cell) {
        if (window.confirm("Tem certeza que pretende eliminar esta aula?")) {
          const linha = cell.getData();

          const url = `http://localhost:3000/aulas/${linha._id}`;
          const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          fetch(url, requestOptions).then(() => cell.getRow().delete());
        }
      },
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
