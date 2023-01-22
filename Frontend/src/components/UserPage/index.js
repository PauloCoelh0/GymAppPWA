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
import { Mensagens } from "./components/Mensagens";
import { Inscricao } from "./components/Inscricoes/inscricao";
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
import { InscricoesContext, TabContext } from "../AdminPage/contexts";
import { MensagensContext } from "../../contexts";
import Cookies from "js-cookie";

const UserPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { isError, isLoading, user } = useGetPerfil("users");
  const { countAulas } = useContext(TabContext);
  const { countAulasInscritas } = useContext(InscricoesContext);
  const { countMensagens } = useContext(MensagensContext);
  console.log(countAulas);

  const userRole = Cookies.get("userRole");
  console.log(userRole);

  const navItems = [
    {
      id: "1",
      title: "Perfil",
      show: userRole === "vip" || "normal",
    },
    {
      id: "2",
      title: "Aulas",
      count: countAulas,
      show: userRole === "vip",
    },
    {
      id: "3",
      title: "Inscrições",
      count: countAulasInscritas,
      show: userRole === "vip",
    },
    {
      id: "4",
      title: "Registos de Acesso",
      show: userRole === "vip" || "normal",
    },
    {
      id: "5",
      title: "Mensagens",
      count: countMensagens,
      show: userRole === "vip" || "normal",
    },
    {
      id: "6",
      title: "Member",
      show: userRole === "vip" || "normal",
    },
  ];

  const items = [
    {
      id: "1",
      children: <Perfil user={user.data} />,
    },
    {
      id: "2",
      children: <Aulas />,
    },
    {
      id: "3",
      children: <Inscricao />,
    },
    {
      id: "4",
      children: <RegistosAcesso />,
    },
    {
      id: "5",
      children: <Mensagens />,
    },
    {
      id: "6",
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
            return item.show ? (
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
            ) : null;
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
