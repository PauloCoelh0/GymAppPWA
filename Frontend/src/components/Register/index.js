import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "./hooks/useGetData";
import { UsersContext } from "../../contexts/UsersProvider";
import { usePostData } from "./hooks/usePostData";
import "./registerForm.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const url = "http://localhost:3000/auth/register";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => postUser(data);
  const navigate = useNavigate();

  const postUser = async (data) => {
    const userData = new FormData();
    userData.append("name", data.name);
    userData.append("email", data.email);
    userData.append("password", data.password);
    userData.append("age", data.age);
    userData.append("address", data.address);
    userData.append("country", data.country);
    userData.append("picture", data.picture[0]);

    try {
      const response = await axios.post(url, userData, {
        headers: {},
      });
      console.log(response);
      if (response.status === 200) {
        alert("Pedido de registo enviado com sucesso!!");
        navigate("/login");
        return response.data.data;
      } else {
        alert("Error ao adicionar");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Row align="middle" justify="center">
      <div>
        <p />
        <h3>Registar</h3>
        <p />
        <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
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
          <input
            type="file"
            id="picture"
            name="picture"
            {...register("picture")}
          />

          <input className={styles.button} type="submit" value="Criar Conta" />
        </form>
      </div>
    </Row>
  );
};

export default Users;
