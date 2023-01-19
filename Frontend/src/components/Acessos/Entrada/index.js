import { useForm } from "react-hook-form";
import { Container, Row, Col } from "reactstrap";
import styles from "./styles.module.scss";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import _, { set } from "lodash";
import { useGetPerfil } from "../../../hooks/useGetPerfil";
import QrRead from "../../QrcodeRead";

const Entrada = () => {
  const [showQRCode, setQrCode] = useState(false);
  const [dataQrCode, setDataQrCode] = useState({});
  const { register, handleSubmit } = useForm();
  const [isLogged, setLogged] = useState(false);
  const [roleName, setRoleName] = useState();
  const onSubmit = (data) => entryRegister(data);
  const { user } = useGetPerfil("users");

  const entryRegister = (data) => {
    fetch("/acessos/create", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((response) => {
        // console.log(response);
        if (response) {
          alert("A sua entrada foi permitida");
        } else {
          alert("Saida registada");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (!_.isEmpty(dataQrCode)) {
      let data = {
        _id: dataQrCode._id,
        horaEntrada: new Date().toISOString(),
        local: "entrada",
      };
      entryRegister(data);
    }
  }, [dataQrCode]);

  return (
    <Container>
      <Row>
        <Col>
          <div className={styles.container}>
            <div className={styles.qrContainer}>
              {showQRCode && <QrRead setDataLogin={setDataQrCode} />}
              {
                <button
                  className={styles.formbtn}
                  onClick={() => setQrCode(!showQRCode)}
                >
                  Passar QrCode
                </button>
              }
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Entrada;
