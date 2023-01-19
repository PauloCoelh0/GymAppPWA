import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { TabContext } from "../../contexts";
import moment from "moment";
import "font-awesome/css/font-awesome.min.css";

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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { red } from "@mui/material/colors";
import AulasForm from "./addAulaForm";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

const Aulas = () => {
  const { register, handleSubmit } = useForm();
  const { isError, isLoading, data } = useGetData("aulas", 0, 0);
  // const { isLoading: isLoadingPost, addData } = usePostData("aulas/create");
  const { setGamesCount } = useContext(TabContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setGamesCount(data.data.length);
  }, [data, setGamesCount]);

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

  // var infoIcon = function (value, data, cell, row, options) {
  //   var html = <img class={styles.infoImage} src="./details.png" />;
  //   return html;
  // };

  var delIcon = function (value, data, cell, row, options) {
    //plain text value
    return '<span><i class="fa fa-trash"></i></span>';
  };

  var updateIcon = function (value, data, cell, row, options) {
    //plain text value
    return '<span><i class="fa fa-floppy-o"></i></span>';
  };

  //custom date formatter
  var dateFormatter = function (cell, formatterParams) {
    const sCellValue = cell.getValue();
    if (!sCellValue) return "";
    return moment(sCellValue).format("YYYY-MM-DD HH:mm");
  };

  var deleteButton = function (e, cell) {
    var html = "Delete";
    return html;
  };
  var updateButton = function (e, cell) {
    var html = "Update";
    return html;
  };

  //custom date editor

  var dateEditor = function (cell, onRendered, success, cancel, editorParams) {
    var editor = document.createElement("input");
    editor.setAttribute("type", "datetime-local");
    //create and style input
    editor.style.padding = "3px";
    editor.style.width = "100%";
    editor.style.boxSizing = "border-box";
    //Set value of editor to the current value of the cell
    editor.value = moment(cell.getValue()).format("DD-MM-YYYY HH:mm");
    //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
    onRendered(function () {
      editor.focus();
      editor.style.css = "100%";
    });
    //when the value has been set, trigger the cell to update
    function successFunc() {
      success(
        moment(editor.value, "DD-MM-YYYY HH:mm").formatformat(
          "DD-MM-YYYY HH:mm"
        )
      );
    }

    editor.addEventListener("change", successFunc);
    editor.addEventListener("blur", successFunc);

    //return the editor element
    return editor;
  };

  const columns = [
    // {
    //   title: "User ID",
    //   field: "_id",
    //   headerFilter: "input",
    //   formatter: "link",
    //   formatterParams: {
    //     url: (cell) => {
    //       return "http://localhost:3000/aulas/" + cell.getValue();
    //     },
    //   },
    // },

    {
      title: "Aula",
      field: "name",
      editor: true,
      width: 230,
      headerFilter: "input",
    },
    {
      title: "Capacidade",
      field: "capacity",
      editor: "select",
      editorParams: ["5", "10", "15", "20", "25", "30"],
      width: 124,
      hozAlign: "center",
      headerFilter: "input",
    },
    {
      title: "Sala",
      field: "room",
      editor: true,
      width: 72,
      headerFilter: "input",
      hozAlign: "center",
    },
    {
      title: "Data de Início",
      hozAlign: "center",
      field: "beginDate",
      editor: "input",
      formatter: dateFormatter,
      headerFilter: "input",
      width: 175,
    },
    {
      title: "Data de Fim",
      hozAlign: "center",
      field: "endDate",
      editor: "input",
      formatter: dateFormatter,
      headerFilter: "input",
      width: 175,
    },
    {
      title: "Participantes",
      field: "participants",
      editor: true,
      width: 150,
      hozAlign: "center",
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
    {
      title: "GUARDAR",
      width: 100,
      formatter: updateIcon,
      hozAlign: "center",
      align: "right",
      headerSort: false,
      cellClick: function (e, cell) {
        if (window.confirm("Tem certeza que pretende alterar esta aula?")) {
          const linha = cell.getData();
          console.log(linha);
          const url = `http://localhost:3000/aulas/update/${linha._id}`;
          const requestOptions = {
            method: "PUT",
            body: JSON.stringify(linha),
            headers: {
              "Content-Type": "application/json",
            },
          };
          fetch(url, requestOptions).then(
            () => cell.getRow().update(),
            console.log("fez update")
          );
        }
      },
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
      <div>
        <AulasForm />
      </div>
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

export default Aulas;
