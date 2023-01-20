import React, { useEffect, useState, useContext } from "react";
import {
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import Aulas from "./components/Marcacoes/marcacao";
import { AulasMarcadas } from "./components/AulasMarcadas";
import { RegistosAcesso } from "./components/RegistosAcesso";
import { Perfil } from "./components/Perfil";
import { Member } from "./components/Member";
import styles from "./styles.module.scss";
import { useGetPerfil } from "../../hooks/useGetPerfil";
import {
  socketAddListener,
  socketRemoveListener,
  initSocket,
} from "../../socket/socket";
import addNotification from "react-push-notification";
import { TabContext } from "../AdminPage/contexts";

const UserPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { isError, isLoading, user } = useGetPerfil("users");
  const { countAulas } = useContext(TabContext);

  console.log(countAulas);

  const newNotifiction = (data) => {
    if (data.key === "Game") {
      addNotification({
        title: "Warning",
        subtitle: "Games",
        message: data.message,
        theme: "darkblue",
        native: false,
      });
    } else {
      addNotification({
        title: "New Notification",
        subtitle: "User",
        message: data.message,
        theme: "red",
        native: false,
      });
    }
  };

  useEffect(() => {
    initSocket();
    console.log("Entrei aqui");
    socketAddListener("admin_notifications", newNotifiction);

    return () => socketRemoveListener("admin_notifications", newNotifiction);
  }, []);

  const navItems = [
    {
      id: "1",
      title: "Aulas",
      count: countAulas,
    },
    {
      id: "2",
      title: "Perfil",
    },
    {
      id: "3",
      title: "AulasMarcadas",
    },
    {
      id: "4",
      title: "Registos de Acesso",
    },
    {
      id: "5",
      title: "Member",
    },
  ];

  const items = [
    {
      id: "2",
      children: <Perfil user={user.data} />,
    },
    {
      id: "1",
      children: <Aulas />,
    },
    {
      id: "3",
      children: <AulasMarcadas />,
    },
    {
      id: "4",
      children: <RegistosAcesso />,
    },
    {
      id: "5",
      children: <Member user={user.data} />,
    },
  ];

  return (
    <Container className={styles.container}>
      <br />
      <h1>Utilizador {user.data.name}</h1>
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

export default UserPage;
