import React, { useState, useEffect } from "react";
import "./styles.module.scss";
import homePage from "./HomePage.jpg";
import axios from "axios";

const HomePage = () => {
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

  return (
    <html>
      <head>
        <title>GYM-ESTG</title>
      </head>
      <body
        style={{
          backgroundImage: `url(${homePage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          style={{
            color: "rgb(131, 6, 6)",
            textShadow: "2px 2px 3px rgb(187, 168, 168)",
            paddingTop: "50px",
            marginBottom: "30px",
            fontSize: "3em",
          }}
        >
          Bem-Vindo ao GYM-ESTG
        </h1>
        <h2>Números de membros dentro do ginásio: {dataArray}</h2>
        <p
          style={{
            textAlign: "center",
            margin: "20px 0",
            padding: "0 50px",
            fontSize: "1.2em",
          }}
        >
          Aqui no My Gym, oferecemos uma variedade de opções de associação para
          atender às suas necessidades de condicionamento físico e orçamento.
        </p>
        <h2>Opções de adesão</h2>
        <table>
          <tr>
            <th>Tipo de Membro</th>
            <th>Preço por mês</th>
          </tr>
          <tr>
            <td>Básico</td>
            <td>20€</td>
          </tr>
          <tr>
            <td>Padrão</td>
            <td>50€</td>
          </tr>
          <tr>
            <td>Vip</td>
            <td>80€</td>
          </tr>
        </table>
        <h3>
          <u>Associação Básica</u>
        </h3>
        <p
          style={{
            textAlign: "center",
            margin: "20px 0",
            padding: "0 50px",
            fontSize: "1.2em",
          }}
        >
          A nossa assinatura básica inclui acesso a todos os nossos equipamentos
          aeróbicos e máquinas de peso.
        </p>
        <h3>
          <u>Associação Padrão</u>
        </h3>
        <p
          style={{
            textAlign: "center",
            margin: "20px 0",
            padding: "0 50px",
            fontSize: "1.2em",
          }}
        >
          A nossa associação padrão inclui acesso a aulas de ginástica em grupo
          e um treinamento pessoal sessão por mês.
        </p>
        <h3>
          <u>Assinatura Vip</u>
        </h3>
        <p
          style={{
            textAlign: "center",
            margin: "20px 0",
            padding: "0 50px",
            fontSize: "1.2em",
          }}
        >
          A nossa assinatura vip inclui todas as assinaturas básicas e padrão
          benefícios e acesso à nossa sauna, banho turco, jacuzzi e piscina.
        </p>
        <p
          style={{
            textAlign: "center",
            margin: "20px 0",
            padding: "0 50px",
            fontSize: "1.2em",
          }}
        >
          <b>
            Visite-nos hoje e comece a atingir seus objetivos de condicionamento
            físico!
          </b>
        </p>
      </body>
    </html>
  );
};

export default HomePage;
