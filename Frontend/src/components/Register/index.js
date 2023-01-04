import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "./hooks/useGetData";
import { UsersContext } from "../../contexts/UsersProvider";
import { usePostData } from "./hooks/usePostData";
import "./registerForm.css";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const { setUsers } = useContext(UsersContext);
  const { isError, isLoading, data } = useGetData("users", 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData("users");

  const addUser = (data) => {
    const newData = {
      ...data,
      role: { name: "normal", scope: "normal" },
    };

    addData(newData);
  };

  useEffect(() => {
    setUsers(data.data);
  }, [data, setUsers]);

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Row align="middle" justify="center">
      <div>
        <p />
        <h3>Registar</h3>
        <p />
        <form className={styles.registerForm} onSubmit={handleSubmit(addUser)}>
          <input
            placeholder="Insere o teu nome"
            id="name"
            name="name"
            required="required"
            {...register("name")}
          />

          <input
            placeholder="Insere a tua password"
            id="password"
            type="password"
            name="password"
            required="required"
            {...register("password")}
          />

          <input
            placeholder="Insere o teu e-mail"
            id="email"
            type="email"
            name="email"
            required="required"
            {...register("email")}
          />

          <input
            placeholder="Insere a tua idade"
            id="age"
            name="age"
            type="number"
            {...register("age")}
          />

          <input
            placeholder="Insere a tua morada"
            id="address"
            name="address"
            required="required"
            {...register("address")}
          />

          <input
            placeholder="Insere o teu país de origem"
            id="country"
            name="country"
            required="required"
            {...register("country")}
          />

          <input className={styles.button} type="submit" value="Criar Conta" />
        </form>
      </div>
    </Row>
  );
};

export default Users;
