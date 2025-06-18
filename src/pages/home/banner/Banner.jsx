// Banner.jsx
import React from "react";
import { useNavigate } from "react-router"; // Importa useNavigate
import "./Banner.css";

const Banner = () => {
  const navigate = useNavigate(); // Hook de navegación

  return (
    <section className="featured-section">
      <div className="container featured-content">

        {/* Columna de imágenes */}
        <div className="images-column">
          <div className="small-images">
            <div className="img-wrapper img-small">
              <img src="/public/image/carpinteria1.jpg" alt="Planta 1" />
            </div>
            <div className="img-wrapper img-small">
              <img src="/public/image/construccion1.jpg" alt="Cactus" />
            </div>
          </div>
          <div className="img-wrapper img-large">
            <img src="/public/image/enchape1.png" alt="Anthurium Flower" />
            <div className="overlay">
              <h3 className="overlay-title">¡Renueva tus espacios!</h3>
              <p className="overlay-text">
                Encuentra materiales, acabados y asesoría profesional para darle un nuevo estilo a tu hogar o proyecto. Publica lo que necesitas o descubre lo que otros ofrecen cerca de ti.
              </p>
              <a href="#" className="btn overlay-btn">
                Ver más
              </a>
            </div>
          </div>
        </div>

        {/* Columna de texto */}
        <div className="text-column">
          <h2 className="headline">Explora y encuentra lo que necesitas en un solo lugar.</h2>
          <p className="subtext">
            Descubre productos únicos, servicios especializados y oportunidades increíbles. 
            Nuestra plataforma conecta personas y negocios para que puedas comprar, vender o contratar fácilmente, de forma segura y confiable.
          </p>
          <button
            className="btn primary-btn"
            onClick={() => navigate("/productos")}
          >
            Ver Más Productos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
