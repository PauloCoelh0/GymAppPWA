import React, { useState, useContext, useEffect } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import styles from "./styles.module.scss";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts";
import axios from "axios";

const Header = () => {
  const { countUsers } = useContext(UsersContext);
  const [logOut, setLogOut] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("token")
  );

  const [data, setData] = useState([]);
  const dataArray = Object.values(data);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/acessos/count/entrada`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    setLoggedIn(localStorage.getItem("token"));
    console.log(localStorage.getItem("token"));
  });

  const navigate = useNavigate();
  const logout = () => {
    fetch("/auth/logout", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then((r) => r.json())
      .then((response) => {
        response.logout && localStorage.removeItem("token");
        setLoggedIn(localStorage.getItem("token"));
        console.log(localStorage.getItem("token"));
        response.logout && setLogOut(true);
        // if (response.auth) {
        //   setLogged(response.auth);
        // } else {
        //   alert("Login failed");
        // }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return !!logOut ? (
    (setLogOut(false), navigate("/login"))
  ) : (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img
          className={`${styles.img} ${isHovered ? styles.hovered : ""}`}
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
      <div className={styles.counts}>MEMBROS NO GYM: {dataArray}</div>
      <Navbar pills={true} container={false} className={styles.navBar}>
        {!isLoggedIn && (
          <>
            <NavbarBrand className={styles.link} href="/login">
              Entrar
            </NavbarBrand>
            <NavbarBrand className={styles.link} href="/register">
              Registar
            </NavbarBrand>
          </>
        )}

        {isLoggedIn && (
          <Button
            className={styles.button}
            onClick={() => {
              logout();
            }}
          >
            Terminar Sessão
          </Button>
        )}
      </Navbar>
    </div>
  );
};

export default Header;
