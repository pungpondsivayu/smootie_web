import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { PrivateRoutes } from "./routes/routesConfig";
import SignIn from "./pages/AuthPages/SignIn";
import AppLayout from "./layout/AppLayout";
import { useAppSelector } from "./redux/store/hook";
import SignUp from "./pages/AuthPages/SignUp";
import PrivateRoute from "./utils/PrivateRoute";

export default function App() {
  const { isAuthenticated }: any = useAppSelector((state) => state.auth);
  
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            {PrivateRoutes.map(
              ({ path, component: Component, allowedRoles }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PrivateRoute allowedRoles={allowedRoles}>
                      <Component />
                    </PrivateRoute>
                  }
                />
              )
            )}
          </Route>
          {!isAuthenticated && (
            <>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
