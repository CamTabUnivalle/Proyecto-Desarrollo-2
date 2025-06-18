import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Banner from "./banner/Banner.jsx";
import useAuthStore from "../../stores/use-auth-store";
import "./Home.css";

const productos = [
  { name: "Taladro", img: "/image/taladro.png", price: 135 },
  { name: "Cemento Argos", img: "/image/cementos-argos.png", price: 70 },
  { name: "Panel de Yeso", img: "/image/panel-yeso.png", price: 90 },
  { name: "Pintura Pintuco", img: "/image/pintuco.png", price: 50 },
  { name: "Madera Estructural", img: "/image/madera-estructural.png", price: 120 },
  { name: "Pinza", img: "/image/pinza.png", price: 45 },
];

// Tarjeta de producto, recibe props de favorito y evento para cambiarlo
function ProductoCard({ prod, isFav, onToggleFav, userLogged }) {
  const [animate, setAnimate] = useState(false);

  // Detecta cambio de favorito (tanto activar como desactivar) para animar
  useEffect(() => {
    if (typeof isFav === "boolean") {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isFav]);

  // Si no hay sesión, ícono aparece opaco y sin click
  const disabled = !userLogged;

  return (
    <div className="product-card">
      <img className="product-img" src={prod.img} alt={prod.name} />
      <h3>{prod.name}</h3>
      <p className="price">${prod.price}</p>
      <button className="add-to-cart">Agregar al carrito</button>
      <span className="fav-icon-wrapper">
        <img
          src={isFav ? "/image/favorito1.png" : "/image/favorito.png"}
          alt="Favorito"
          className={
            "fav-icon" +
            (animate ? " fav-icon--bright" : "") +
            (disabled ? " fav-icon--disabled" : "")
          }
          onClick={() => !disabled && onToggleFav(prod.name)}
          style={{ pointerEvents: disabled ? "none" : "auto" }}
        />
      </span>
    </div>
  );
}

const Home = () => {
  const { userLogged } = useAuthStore();
  const navigate = useNavigate();

  // --- Favoritos en el Home (clave: nombre del producto) ---
  const [favoritos, setFavoritos] = useState({});

  // Cuando cierre sesión, limpia favoritos
  useEffect(() => {
    if (!userLogged) setFavoritos({});
  }, [userLogged]);

  const handleToggleFav = (prodName) => {
    setFavoritos((prev) => ({
      ...prev,
      [prodName]: !prev[prodName],
    }));
  };

  // Carousel funciones (no cambian)
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

  const handleCategoryClick = (name) => {
    navigate(`/categoria/${name.toLowerCase()}`);
  };

  return (
    <div className="home">
      {/* Banner */}
      <Banner />

      {/* Beneficios */}
      <section className="home__benefits">
        <div className="benefit-card">
          <img className="benefit-icon" src="/image/envio-rapido.png" alt="Envío rápido" />
          <p>Envíos a todo el país</p>
        </div>
        <div className="benefit-card">
          <img className="benefit-icon" src="/image/atencion-al-cliente.png" alt="Atención al cliente" />
          <p>Servicio al cliente 24/7</p>
        </div>
        <div className="benefit-card">
          <img className="benefit-icon" src="/image/tarjeta-pago.png" alt="Pago seguro" />
          <p>Pagos 100% seguros</p>
        </div>
      </section>

      {/* Productos */}
      <section className="home__products">
        <h2>Productos Destacados</h2>
        <div className="products-grid">
          {productos.map((prod, idx) => (
            <ProductoCard
              prod={prod}
              key={idx}
              isFav={!!favoritos[prod.name]}
              onToggleFav={handleToggleFav}
              userLogged={userLogged}
            />
          ))}
        </div>
      </section>

      {/* Categorías */}
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
              <div
                className="category-card"
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                style={{ cursor: "pointer" }}
              >
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
