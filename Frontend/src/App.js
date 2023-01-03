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
import { Notifications } from "react-push-notification";

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
        <Route path="/">
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
                    <AdminPage />
                  </TabProvider>
                </UsersProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
        </Route>
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
