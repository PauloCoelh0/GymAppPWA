import React, { useState, useContext } from "react";
import styles from "./styles.module.scss";
import {
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import Mensagens from "./components/Mensagens";
import Aulas from "./components/Aulas";
import Users from "./components/Users";
import { TabContext } from "./contexts";
import { UsersContext } from "../../contexts";
import { RegistosAcesso } from "./components/RegistoAcessos";
import { AcessosContext } from "./contexts";

const AdminPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { countAulas } = useContext(TabContext);
  const { countUsers } = useContext(UsersContext);
  const { countAcessos } = useContext(AcessosContext);

  const navItems = [
    {
      id: "1",
      title: "Aulas",
      count: countAulas,
    },
    {
      id: "2",
      title: "Users",
      count: countUsers,
    },
    {
      id: "3",
      title: "Registos de Acesso",
      count: countAcessos,
    },

    {
      id: "4",
      title: "Mensagens",
    },
  ];

  const items = [
    {
      id: "1",
      children: <Aulas />,
    },
    {
      id: "2",
      children: <Users />,
    },
    {
      id: "3",
      children: <RegistosAcesso />,
    },

    {
      id: "4",
      children: <Mensagens />,
    },
  ];

  return (
    <Container className={styles.container}>
      <br />
      <h1>Gestor</h1>
      <br />
      <Row className={styles.row}>
        <Nav tabs>
          {navItems.map((item) => {
            return (
              <NavItem>
                <NavLink
                  style={{ color: "rgb(131, 6, 6)" }}
                  className={item.id === activePage}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.title}{" "}
                  {item.count && (
                    <span className={styles.count}>{item.count}</span>
                  )}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={activePage}>
          {items.map((item) => {
            return <TabPane tabId={item.id}>{item.children}</TabPane>;
          })}
        </TabContent>
      </Row>
    </Container>
  );
};

export default AdminPage;
