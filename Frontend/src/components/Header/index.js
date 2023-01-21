import React, { useContext } from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";
import styles from "./styles.module.scss";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [logOut, setLogOut] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(
    localStorage.getItem("token")
  );

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
        <img className={styles.img} src={logo} alt="Logo" />
      </div>
      {/* {countUsers !== 0 && (
        <div className={styles.counts}>Users: {countUsers}</div>
      )} */}
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
