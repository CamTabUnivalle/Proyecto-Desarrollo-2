import { useCallback } from "react";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router";
import "./Home.css";

const Home = () => {
  const { loginGoogleWithPopUp } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp()
      .then(() => navigate("perfil"))
      .catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

  return (
    <>
      <h2>Continua con Google</h2>
      <button
        type="button"
        title="Iniciar sesíón con Google"
        onClick={handleLogin}
      >
        Iniciar sesión
      </button>
    </>
  );
};

export default Home;