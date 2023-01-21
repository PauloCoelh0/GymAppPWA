import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { UsersContext } from "../../../../contexts";
import { ReactTabulator } from "react-tabulator";

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
  const { setUsers } = useContext(UsersContext);
  const { isError, isLoading, data } = useGetData("users", 0, 0);

  useEffect(() => {
    setUsers(data.data);
  }, [data, setUsers]);

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }
  var updateIcon = function (value, data, cell, row, options) {
    return '<span><i class="fa fa-floppy-o"></i></span>';
  };

  const columns = [
    {
      title: "Email",
      field: "email",

      headerFilter: "input",
    },
    {
      title: "Nome",
      field: "name",

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
    {
      title: "Cargo",
      editor: "select",
      editorParams: ["normal", "vip", "gestor"],
      field: "role.scope",
      headerFilter: "input",
    },
    {
      title: "GUARDAR",
      width: 100,
      formatter: updateIcon,
      hozAlign: "center",
      align: "right",
      headerSort: false,
      cellClick: function (e, cell) {
        if (window.confirm("Tem certeza que pretende alterar este cargo?")) {
          const linha = cell.getData();
          console.log(linha);
          linha.role.name = linha.role.scope;
          const url = `http://localhost:3000/users/${linha._id}`;
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
      <h2 className={styles.title}>Users</h2>
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

export default Users;
