import { useAppSelector } from "../redux/store/hook";
import PrivateLayout from "./private/PrivateLayout";

function AppLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const layout = isAuthenticated ? <PrivateLayout /> : <PrivateLayout />;
  return <> {layout}</>;
}

export default AppLayout