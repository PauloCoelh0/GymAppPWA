import { useForm } from "react-hook-form";
import { Row } from "reactstrap";
import styles from "./styles.module.scss";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import _, { set } from "lodash";
import { useGetPerfil } from "../../hooks/useGetPerfil";
import QrRead from "../QrcodeRead";
import HttpStatus from "http-status-codes";

const LoginForm = ({ title, role, data }) => {
  const { register, handleSubmit } = useForm();
  const [isLogged, setLogged] = useState(false);
  const [showQRCode, setQrCode] = useState(false);
  const [dataQrCode, setDataQrCode] = useState({});
  const [roleName, setRoleName] = useState();
  const onSubmit = (data) => login(data);
  const { user } = useGetPerfil("users");

  const login = (data) => {
    fetch("/auth/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          alert(response.message);
          return;
        }
        if (response.auth) {
          localStorage.setItem("token", response.token);
          console.log(response);
          setLogged(response.auth);
          console.log(response.userRole);
          setRoleName(response.userRole);
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        if (error.status === 500) {
          alert("An internal server error occurred. Please try again later.");
        } else {
          console.error("Error:", error);
        }
      });
  };

  // useEffect(() => {
  //   setRoleName(user.data.role.name);
  // }, [isLogged]);

  useEffect(() => {
    if (!_.isEmpty(dataQrCode)) {
      // setDataQrCode(data);
      login(dataQrCode);
    }
  }, [data, dataQrCode]);

  if (isLogged) {
    return roleName === "gestor" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/user" />
    );
  }
  // return <Navigate to="/user" replace={true} />;
  // return role === "gestor" ? (
  //   <Navigate to="/admin" replace={true} />
  // ) : (
  //   <Navigate to="/user" replace={true} />
  // );

  return (
    <Row align="middle" justify="center" data={data}>
      <div>
        <p></p>
        <h2>Entrar</h2>
        <p></p>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Insere o teu e-mail"
            id="email"
            name="email"
            required="required"
            {...register("email")}
          />
          <input
            placeholder="Insere a tua palavra-passe"
            id="password"
            name="password"
            type="password"
            required="required"
            {...register("password")}
          />
          <input
            // style={{ backgroundColor: "black", color: "white" }}
            className={styles.button}
            type="submit"
            value="Iniciar Sessão"
          />
          <div>
            {showQRCode && <QrRead setDataLogin={setDataQrCode} />}
            {
              <button
                // style={{ borderRadius: "10px", backgroundColor: "red" }}
                className={styles.button}
                style={{ width: "337px" }}
                onClick={() => setQrCode(!showQRCode)}
              >
                Iniciar Sessão com Qr Code
              </button>
            }
          </div>
        </form>
        <a href="/forgotPassword">Não sabes a tua palavra-passe?</a>
      </div>
    </Row>
  );
};

export default LoginForm;
