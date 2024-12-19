import { jwtDecode } from "jwt-decode";
import { useAuth } from "../middlewares/ProtectedRoutes";

const useSession = () => {
  const session = useAuth();
  const decodedSession = session ? jwtDecode(session) : null;
  return decodedSession;
};

export default useSession;
