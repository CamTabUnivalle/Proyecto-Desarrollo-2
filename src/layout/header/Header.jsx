import { NavLink } from "react-router";
import React, { useState } from "react";
import useAuthStore from "../../stores/use-auth-store";
import "./Header.css";

const Header = () => {
  const { userLogged, loginGoogleWithPopUp, logoutGoogle } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);

  const handleUserIconClick = () => {
    setModalOpen(true);
  };

  const handleGoogleLogin = async () => {
    await loginGoogleWithPopUp();
    setModalOpen(false);
  };

  const handleLogout = async () => {
    await logoutGoogle();
    setModalOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-content">

        {/* LOGO */}
        <NavLink className="logo" to="/">
          <img src="/public/Logo/logo-quetzal-market.webp" alt="Quetzal Logo" />
        </NavLink>

        {/* MENÚ */}
        <nav className="main-menu">
          <NavLink to="/" end className="menu-link">Inicio</NavLink>
          <NavLink to="/tienda" className="menu-link">Tienda</NavLink>

          <div className="menu-dropdown">
            <button className="menu-link">Categorías <span className="caret">▾</span></button>
            <ul className="dropdown-list">
              {[1,2,3].map(id => (
                <li key={id}>
                  <NavLink to={`/categorias/${id}`} className="dropdown-link">
                    Categoría {id}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="menu-dropdown">
            <button className="menu-link">Servicios <span className="caret">▾</span></button>
            <ul className="dropdown-list">
              {["a","b","c"].map(key => (
                <li key={key}>
                  <NavLink to={`/servicios/${key}`} className="dropdown-link">
                    Servicio {key.toUpperCase()}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <NavLink to="/blog" className="menu-link">Blog</NavLink>
        </nav>

        {/* ICONOS PNG */}
        <div className="icon-menu">
          <NavLink to="/search" className="icon-link">
            <img src="/public/image/buscar.png" alt="Buscar" className="header-icon" />
          </NavLink>
          <NavLink to="/cart" className="icon-link">
            <img src="/public/image/carrito-compra.png" alt="Carrito" className="header-icon" />
          </NavLink>
          {/* Ícono de usuario */}
          <span className="icon-link" onClick={handleUserIconClick} style={{ cursor: "pointer" }}>
            <img src="/public/image/usuario.png" alt="Usuario" className="header-icon" />
          </span>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {/* Modal para iniciar sesión */}
            {!userLogged ? (
              <>
                <h2 className="modal-title">Iniciar sesión</h2>
                <button className="google-login-btn" onClick={handleGoogleLogin}>
                  <img src="/public/image/google.png" alt="Google" className="google-icon" />
                  Iniciar sesión con Google
                </button>
                <button className="modal-cancel-btn" onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <h2 className="modal-title">¿Quieres cerrar sesión?</h2>
                <button className="modal-confirm-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
                <button className="modal-cancel-btn" onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
