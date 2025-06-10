import { useCallback } from "react";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router";
import Banner from "./banner/Banner";
import "./Home.css";

const Home = () => {
  const { userLogged, loginGoogleWithPopUp, logoutGoogle } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp()
      .then(() => navigate("/perfil"))
      .catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

  const handleLogout = useCallback(() => {
    logoutGoogle().then(() => navigate("/"));
  }, [logoutGoogle, navigate]);

  const scrollLeft = () => {
    document
      .getElementById("carousel")
      .scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    document
      .getElementById("carousel")
      .scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="home">
      {userLogged && (
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}

      {/* Sección Banner */}
      <section className="home__banner">
        <h1>Bienvenido a nuestra tienda</h1>
        {!userLogged && (
          <>
            <p>Continúa con Google para explorar más.</p>
            <button
              type="button"
              className="login-btn"
              onClick={handleLogin}
              title="Iniciar sesión con Google"
            >
              Iniciar sesión
            </button>
          </>
        )}
      </section>

      <Banner />

      {/* Sección Beneficios */}
      <section className="home__benefits">
        <div className="benefit-card">
          <img
            className="benefit-icon"
            src="/image/envio-rapido.png"
            alt="Envío rápido"
          />
          <p>Envíos a todo el país</p>
        </div>
        <div className="benefit-card">
          <img
            className="benefit-icon"
            src="/image/atencion-al-cliente.png"
            alt="Atención al cliente"
          />
          <p>Servicio al cliente 24/7</p>
        </div>
        <div className="benefit-card">
          <img
            className="benefit-icon"
            src="/image/tarjeta-pago.png"
            alt="Pago seguro"
          />
          <p>Pagos 100% seguros</p>
        </div>
      </section>

      {/* Sección Productos */}
      <section className="home__products">
        <h2>Productos Destacados</h2>
        <div className="products-grid">
          {[
            { name: "Taladro", img: "/image/taladro.png", price: 135 },
            {
              name: "Cemento Argos",
              img: "/image/cementos-argos.png",
              price: 70,
            },
            { name: "Panel de Yeso", img: "/image/panel-yeso.png", price: 90 },
            { name: "Pintura Pintuco", img: "/image/pintuco.png", price: 50 },
            {
              name: "Madera Estructural",
              img: "/image/madera-estructural.png",
              price: 120,
            },
            { name: "Pinza", img: "/image/pinza.png", price: 45 },
          ].map((prod, idx) => (
            <div key={idx} className="product-card">
              <img className="product-img" src={prod.img} alt={prod.name} />
              <h3>{prod.name}</h3>
              <p className="price">${prod.price}</p>
              <button className="add-to-cart">Agregar al carrito</button>
              <img
                src="/image/favorito.png"
                alt="Favorito"
                className="fav-icon"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Sección Categorías */}
      <section className="home__categories">
        <h2>Categorías</h2>
        <div className="carousel-wrapper">
          <button className="carousel-btn left" onClick={scrollLeft}>
            ←
          </button>
          <div className="carousel" id="carousel">
            {[
              { name: "Acabados", img: "/image/acabados.jpg" },
              { name: "Carpinteria", img: "/image/carpinteria.jpg" },
              { name: "Construccion", img: "/image/construccion.jpg" },
              { name: "Enchape", img: "/image/enchape.jpg" },
              { name: "Panel", img: "/image/panel.jpg" },
              { name: "Plomeria", img: "/image/plomeria.jpg" },
            ].map((cat, idx) => (
              <div className="category-card" key={idx}>
                <img src={cat.img} alt={cat.name} />
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
          <button className="carousel-btn right" onClick={scrollRight}>
            →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
