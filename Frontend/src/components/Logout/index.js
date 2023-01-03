import { useForm } from "react-hook-form";
import { Row } from "reactstrap";
import styles from "./styles.module.scss";
import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
import _ from "lodash";

const Logout = ({ title, role, data }) => {
  //   const { register, handleSubmit } = useForm();
    
  //   const [isLogged, setLogged] = useState(false);
  const onSubmit = (data) => logout(data);

  const logout = (data) => {
    fetch("/auth/logout", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response) {
          <Navigate to="/" />;
        } else {
          alert("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Row align="middle" justify="center">
      <form className={styles.formLogin} onSubmit={(onSubmit)}>
        <input className="submit" type="submit" />
      </form>
    </Row>
  );
};

export default Logout;
