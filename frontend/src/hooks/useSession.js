const { useAuth } = require("../middlewares/ProtectedRoutes");
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSession = () => {
  const session = useAuth();
  const decodedSession = session ? jwtDecode(session) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [navigate, session]);
  return decodedSession;
};

export default useSession;
