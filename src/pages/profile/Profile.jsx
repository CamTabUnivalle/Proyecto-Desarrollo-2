import { useCallback, useEffect } from "react";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router";

const Profile = () => {
  const { userLogged, logoutGoogle } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logoutGoogle().then(() => navigate("/"));
  }, [logoutGoogle, navigate]);

  useEffect(() => {
    if (!userLogged) return;
    const fetchData = async () => {
      const { displayName, email } = userLogged;
      const data = { displayName, email };
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}users`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        return await response.json();
      } catch (error) {
        console.error(`Error creating user:`, error);
        throw error;
      }
    };
    fetchData();
  }, [userLogged]);

  return (
    <>
      <h2>Perfil de usuario</h2>
      <p>¡Bienvenido! {userLogged?.displayName}</p>
      <button onClick={handleLogout} title="Cerrar sesión">
        Cerrar sesión
      </button>
    </>
  );
};

export default Profile;
