import React, { useEffect, useState } from "react";
import {
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Marcacoes } from "./components/Marcacoes";
import { Pagamentos } from "./components/Pagamentos";
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

const UserPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { isError, isLoading, user } = useGetPerfil("users");

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
      title: "Perfil",
    },
    {
      id: "2",
      title: "Marcações",
    },
    {
      id: "3",
      title: "Pagamentos",
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
      id: "1",
      children: <Perfil user={user.data} />,
    },
    {
      id: "2",
      children: <Marcacoes />,
    },
    {
      id: "3",
      children: <Pagamentos />,
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
      <h1>User {user.data.name}</h1>
      <Row className={styles.row}>
        <Nav tabs>
          {navItems.map((item) => {
            return (
              <NavItem>
                <NavLink
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
