import React, { useState } from "react";
import "./styles.module.scss";
import { Row, Col, Container } from "reactstrap";
import Header from "../Header";

const HomePage = () => {
  return (
    <html>
      <head>
        <title>My Gym</title>
      </head>
      <body>
        <h1>Welcome to My Gym</h1>
        <p>
          Here at My Gym, we offer a variety of membership options to fit your
          fitness needs and budget.
        </p>

        <h2>Membership Options</h2>
        <table>
          <tr>
            <th>Membership Type</th>
            <th>Price per Month</th>
          </tr>
          <tr>
            <td>Basic</td>
            <td>$20</td>
          </tr>
          <tr>
            <td>Standard</td>
            <td>$50</td>
          </tr>
          <tr>
            <td>Premium</td>
            <td>$80</td>
          </tr>
        </table>

        <h3>Basic Membership</h3>
        <p>
          Our basic membership includes access to all of our cardio equipment
          and weight machines.
        </p>

        <h3>Standard Membership</h3>
        <p>
          In addition to basic membership benefits, our standard membership
          includes access to group fitness classes and a personal training
          session per month.
        </p>

        <h3>Premium Membership</h3>
        <p>
          Our premium membership includes all basic and standard membership
          benefits, as well as 24/7 access to the gym and access to our sauna
          and steam room.
        </p>

        <p>Visit us today and start reaching your fitness goals!</p>
      </body>
    </html>
  );
};

export default HomePage;
