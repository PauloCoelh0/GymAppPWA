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
import Games from "./components/Games";
import Aulas from "./components/Aulas";
import Stadium from "./components/Stadium";
import Users from "./components/Users";
import Tickets from "./components/Tickets";
import { TabContext } from "./contexts";
import { UsersContext } from "../../contexts/UsersProvider";

const AdminPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { countGames } = useContext(TabContext);
  const { countUsers } = useContext(UsersContext);

  const navItems = [
    {
      id: "1",
      title: "Aulas",
      count: countGames,
    },
    {
      id: "2",
      title: "Users",
      count: countUsers,
    },

    // {
    //   id: "3",
    //   title: "Games",
    //   count: countGames,
    // },
    // {
    //   id: "4",
    //   title: "Tickets",
    // },
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

    // {
    //   id: "3",
    //   children: <Games />,
    // },
    // {
    //   id: "4",
    //   children: <Tickets />,
    // },
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
                  style={{ color: "black" }}
                  className={item.id === activePage}
                  onClick={() => setActivePage(item.id)}
                >
                  {item.title}{" "}
                  {item.count !== 0 && (
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
