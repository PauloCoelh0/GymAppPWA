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
import { UsersProvider } from "./contexts/UsersProvider";
import { TabProvider } from "./components/AdminPage/contexts";
import { InscricoesProvider } from "./components/AdminPage/contexts/InscricoesProvider/InscricoesProvider";
import { AcessosProvider } from "./components/AdminPage/contexts";
import { Notifications } from "react-push-notification";
import Entrada from "./components/Acessos/Entrada";
import BanhoTurco from "./components/Acessos/BanhoTurco";
import Jacuzzi from "./components/Acessos/Jacuzzi";

function App() {
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
          <Route path="/home" element={<HomePage />} />
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
                    <UserPage />
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
    </BrowserRouter>
    // <div className={styles.App}>
    //   <Notifications />
    //   <UsersProvider>
    //     <main>
    //       <RouterProvider router={router}>
    //         <Header />
    //       </RouterProvider>
    //     </main>
    //   </UsersProvider>
    // </div>
  );
}

export default App;
