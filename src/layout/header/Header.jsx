import { NavLink } from "react-router";
import "./Header.css";

const Header = () => {
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

        {/* ICONOS */}
        <div className="icon-menu">
          <NavLink to="/search" className="icon-link"><i className="bi bi-search"/></NavLink>
          <NavLink to="/cart"   className="icon-link"><i className="bi bi-cart"/></NavLink>
          <NavLink to="/profile"className="icon-link"><i className="bi bi-person"/></NavLink>
        </div>

      </div>
    </header>
  );
};

export default Header;
