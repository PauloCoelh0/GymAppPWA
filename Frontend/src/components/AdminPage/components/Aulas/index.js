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
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;

const Aulas = () => {
  const { register, handleSubmit } = useForm();
  const { isError, isLoading, data } = useGetData("aulas", 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData("aulas/create");
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
    var value = cell.getValue();

    if (value) {
      value = moment(value, "YYYY/MM/DD HH:mm").format("lll");
    }

    return value;
  };

  var deleteButton = function (e, cell) {
    var html = "Delete";
    return html;
  };
  var updateButton = function (e, cell) {
    var html = "Update";
    return html;
  };

  const columns = [
    {
      title: "User ID",
      field: "_id",
      headerFilter: "input",
      formatter: "link",
      formatterParams: {
        url: (cell) => {
          return "http://localhost:3000/aulas/" + cell.getValue();
        },
      },
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
      editor: true,
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
      field: "beginDate",
      editor: "input",
      formatter: dateFormatter,
      headerFilter: "input",
      width: 155,
    },
    {
      title: "Data de Fim",
      field: "endDate",
      editor: "input",
      formatter: dateFormatter,
      headerFilter: "input",
      width: 155,
    },
    {
      title: "Participantes",
      field: "participants",
      width: 128,
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
      width: 85,
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
      width: 84,
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
        <Button sx={addcar} onClick={handleOpen}>
          ADD AULA
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ADD AULA
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form
                method="post"
                className={styles.formCars1}
                enctype="multipart/formdata"
                onSubmit={handleSubmit(addData)}
              >
                {isLoadingPost ? (
                  <div> is Loading </div>
                ) : (
                  <div className={styles.formCars1}>
                    <div className={styles.field1}>
                      <label>Nome: </label>
                      <input
                        type="text"
                        name="name"
                        {...register("name")}
                        required
                      />
                    </div>
                    <div className={styles.field1}>
                      <label>Capacidade: </label>
                      <input
                        type="text"
                        name="capacity"
                        {...register("capacity")}
                        required
                      />
                    </div>
                    <div className={styles.field1}>
                      <label>Sala: </label>
                      <input
                        type="text"
                        name="room"
                        {...register("room")}
                        required
                      />
                    </div>
                    <div className={styles.field1}>
                      <label>Data de Início: </label>
                      <input
                        type="datetime-local"
                        name="beginDate"
                        {...register("beginDate")}
                        required
                      />
                    </div>
                    <div className={styles.field1}>
                      <label className={styles.l1}>Data de Fim: </label>
                      <input
                        type="datetime-local"
                        name="endDate"
                        {...register("endDate")}
                        required
                      />
                    </div>
                    <br />
                    <input
                      className={styles.submit1}
                      type="submit"
                      value="ADD AULA"
                    />
                  </div>
                )}
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
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
    //       <h3>Criar Aula</h3>
    //       {isLoadingPost ? (
    //         <div> is Loading </div>
    //       ) : (
    //         <div className={styles.container}>
    //           <form className={styles.form} onSubmit={handleSubmit(addData)}>
    //             <div className={styles.field}>
    //               <label className={styles.label} for="beginDate">
    //                 Data-Inicio:
    //               </label>
    //               <input
    //                 id="beginDate"
    //                 type="date"
    //                 name="beginDate"
    //                 required="required"
    //                 {...register("beginDate")}
    //               />
    //             </div>
    //             <div className={styles.field}>
    //               <label className={styles.label} for="endDate">
    //                 Data-Fim:
    //               </label>
    //               <input
    //                 id="endDate"
    //                 type="date"
    //                 name="endDate"
    //                 {...register("endDate")}
    //               />
    //             </div>
    //             <div className={styles.field}>
    //               <label className={styles.label} for="name">
    //                 Nome:
    //               </label>
    //               <input
    //                 id="name"
    //                 name="name"
    //                 required="required"
    //                 {...register("name")}
    //               />
    //             </div>
    //             <div className={styles.field}>
    //               <label className={styles.label} for="room">
    //                 Sala:
    //               </label>
    //               <input
    //                 id="room"
    //                 name="room"
    //                 required="required"
    //                 {...register("room")}
    //               />
    //             </div>
    //             <div className={styles.field}>
    //               <label className={styles.label} for="capacity">
    //                 Capacidade:
    //               </label>
    //               <input
    //                 id="capacity"
    //                 name="capacity"
    //                 required="required"
    //                 {...register("capacity")}
    //               />
    //             </div>
    //             <Row>
    //               <input className="submit" type="submit" />
    //             </Row>
    //           </form>
    //         </div>
    //       )}
    //     </Col>
    //     <Col>
    //       <Table
    //         columns={["beginDate", "endDate", "name", "room", "capacity"]}
    //         rows={data}
    //       />
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default Aulas;
