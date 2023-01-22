import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import styles from "./App.scss";
import HomePage from "./components/HomePage";
import GestaoAcessos from "./components/GestaoAcessos";
import AdminPage from "./components/AdminPage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectRoute";
import Register from "./components/Register";
import Logout from "./components/Logout";
import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";
import { UsersProvider } from "./contexts/UsersProvider/UsersProvider";
import { TabProvider } from "./components/AdminPage/contexts";
import { InscricoesProvider } from "./components/AdminPage/contexts/InscricoesProvider/InscricoesProvider";
import { AcessosProvider } from "./components/AdminPage/contexts";
import { Notifications } from "react-push-notification";
import { MensagensProvider } from "./contexts/MensagensProvider/MensagensProvider";
import Entrada from "./components/Acessos/Entrada";
import BanhoTurco from "./components/Acessos/BanhoTurco";
import Jacuzzi from "./components/Acessos/Jacuzzi";
import addNotification from "react-push-notification";
import {
  socketAddListener,
  socketRemoveListener,
  initSocket,
} from "./socket/socket";
import React, { useEffect, useState, useContext } from "react";

const newNotifiction = (data) => {
  addNotification({
    title: "Warning",
    subtitle: "Aula",
    message: data.message,
    theme: "darkblue",
    native: false,
  });
};

function App() {
  let flag = true;
  useEffect(() => {
    initSocket();
    console.log("Entrei aqui");
    // setUserRole(user.data.role.name);
    if (flag) {
      socketAddListener("gestor_notifications", newNotifiction);
      flag = false;
    }

    return () => socketRemoveListener("gestor_notifications", newNotifiction);
  }, []);
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomePage />,
  //   },
  //   {
  //     path: "/arroz",
  //     element: <Header />,
  //   },
  //   {
  //     path: "/register",
  //     element: <Register />,
  //   },
  //   {
  //     path: "/login",
  //     element: <LoginForm />,
  //   },
  //   {
  //     path: "/logout",
  //     element: <Logout />,
  //   },
  //   {
  //     path: "/admin",
  //     element: (
  //       <ProtectedRoute>
  //         <TabProvider>
  //           <AdminPage />
  //         </TabProvider>
  //       </ProtectedRoute>
  //     ),
  //   },
  //   {
  //     path: "/user",
  //     element: (
  //       <ProtectedRoute>
  //         <UserPage />
  //       </ProtectedRoute>
  //     ),
  //   },
  // ]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route>
          <Route path="/gestaoAcessos" element={<GestaoAcessos />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <UsersProvider>
                  <TabProvider>
                    <AcessosProvider>
                      <AdminPage />
                    </AcessosProvider>
                  </TabProvider>
                </UsersProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <TabProvider>
                  <InscricoesProvider>
                    <MensagensProvider>
                      <UserPage />
                    </MensagensProvider>
                  </InscricoesProvider>
                </TabProvider>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/acessos/entrada" element={<Entrada />} />
        <Route path="acessos/banhoturco" element={<BanhoTurco />} />
        <Route path="acessos/jacuzzi" element={<Jacuzzi />} />
      </Routes>
      <div className={styles.App}>
        <Notifications />
      </div>
    </BrowserRouter>
  );
}

export default App;
