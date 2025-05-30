
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../redux/store/hook";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const location = useLocation();
  const { user:userData }: any = useAppSelector((state) => state.auth);

  const isAuthorized = userData?.role
    ? allowedRoles.includes(userData?.role)
    : false;


  // ตรวจสอบ searchString
  const searchParams = new URLSearchParams(location.search);
  const hasSearchString = searchParams.toString().length > 0;
  
  if (!userData) {
    return (
      <Navigate
        to={"/"}
        replace
        state={{ from: location.pathname, search: location.search }}
      />
    );
  }

  if (!isAuthorized) {
    return <Navigate to="unauthorized" replace />;
  }

  if (hasSearchString && location.search !== window.location.search) {
    return <Navigate to={location.pathname + location.search} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;