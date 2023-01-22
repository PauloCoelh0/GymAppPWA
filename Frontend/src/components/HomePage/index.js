import React, { useState } from "react";
import "./styles.module.scss";
import { Row, Col, Container } from "reactstrap";
import Header from "../Header";

const HomePage = () => {
  return (
    <html>
      <head>
        <title>GYM-ESTG</title>
      </head>
      <body>
        <h1>Bem-Vindo ao GYM-ESTG</h1>
        <p>
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
        <p>
          A nossa assinatura básica inclui acesso a todos os nossos equipamentos
          aeróbicos e máquinas de peso.
        </p>

        <h3>
          <u>Associação Padrão</u>
        </h3>
        <p>
          Além dos benefícios básicos de associação, a nossa associação padrão
          inclui acesso a aulas de ginástica em grupo e um treinamento pessoal
          sessão por mês.
        </p>

        <h3>
          <u>Assinatura Vip</u>
        </h3>
        <p>
          A nossa assinatura vip inclui todas as assinaturas básicas e padrão
          benefícios, bem como acesso 24 horas por dia, 7 dias por semana ao
          ginásio e acesso à nossa sauna, banho turco, jacuzzi e piscina.
        </p>

        <p>
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
